import React, { useState } from 'react'
import { Form } from 'antd'
import axios from 'axios'

//common
import {
  Vocabulary,
  VocabularyAttempt,
  VocabularyRow,
  VocabularyFile,
} from 'common/types'

//css
import * as Styled from 'styles/pages/home'

//config
import { getColumns, getRowSelection } from 'config/vocabularyTable'

export async function getServerSideProps(ctx: any) {
  let vocabulary: VocabularyFile = require('config/vocabulaire.json')

  let vocabularyAttemptList: Array<VocabularyAttempt> = []

  vocabulary.words.forEach((vocabulary: Vocabulary) => {
    vocabularyAttemptList.push({ ...vocabulary, count: 1 })
  })

  return {
    props: {
      vocabulary: vocabularyAttemptList,
    },
  }
}

interface State {
  vocabulary: Array<Vocabulary>
  vocabularyGame: Array<VocabularyAttempt>
  selectedVocabulary: Array<Vocabulary>
  randomIndex: number
  randomType: 1 | 2
  mustShow: boolean
  isStarted: boolean
  recurrenceCounter: number
}

interface Props {
  vocabulary: Array<Vocabulary>
}

const Home = (props: Props): JSX.Element => {
  const convertToRowData = (
    vocabulary: Array<Vocabulary>,
  ): Array<VocabularyRow> => {
    let vRow: Array<VocabularyRow> = []

    vocabulary.forEach((v, index) => {
      vRow.push({ ...v, key: `${index}` })
    })

    return vRow
  }

  const [state, setState] = useState<State>({
    vocabulary: props.vocabulary,
    vocabularyGame: [],
    selectedVocabulary: [],
    randomIndex: 0,
    randomType: 1,
    mustShow: false,
    isStarted: false,
    recurrenceCounter: 1,
  })
  const [form] = Form.useForm()

  const generateRandom = (min = 0, max = 100) => {
    // find diff
    let difference = max - min

    // generate random number
    let rand = Math.random()

    // multiply with difference
    rand = Math.floor(rand * difference)

    // add with min value
    rand = rand + min

    return rand
  }

  const setVocabFileToState = (vocabFile: VocabularyFile) => {
    let newVocabulary: Array<Vocabulary> = []

    vocabFile.words.forEach((v, index) => {
      newVocabulary.push({ ...v })
    })
    setState({
      ...state,
      vocabulary: newVocabulary,
    })
  }

  const handleOnFinishAddWord = async (values: any) => {
    console.log(values)
    form.resetFields()

    try {
      var config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
      const res = await axios.post(
        'http://localhost:3000/api/add-word',
        { form: values },
        config,
      )
      console.log(res.data)
      setVocabFileToState(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnClickDeleteButton = async (index: number) => {
    try {
      var config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
      const res = await axios.post(
        'http://localhost:3000/api/delete-word',
        { index: index },
        config,
      )
      console.log(res.data)
      setVocabFileToState(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnClickStart = () => {
    let newVocabularyGame: Array<VocabularyAttempt> = []

    if (state.selectedVocabulary.length === 0) {
      state.vocabulary.forEach((v) => {
        newVocabularyGame.push({ ...v, count: state.recurrenceCounter })
      })
    } else {
      state.selectedVocabulary.forEach((v) => {
        newVocabularyGame.push({ ...v, count: state.recurrenceCounter })
      })
    }

    const randomIndex = generateRandom(0, newVocabularyGame.length)
    const randomTypeAny = generateRandom(1, 3)
    let randomType: 1 | 2 = 1

    if (randomTypeAny == 1) randomType = 1
    else randomType = 2
    setState({
      ...state,
      isStarted: true,
      vocabularyGame: newVocabularyGame,
      randomIndex: randomIndex,
      randomType: randomType,
    })
  }

  const handleOnClickSuccessButton = () => {
    let newVocabularyGame: Array<VocabularyAttempt> = [...state.vocabularyGame]

    if (newVocabularyGame[state.randomIndex].count - 1 == -1) {
      newVocabularyGame.splice(state.randomIndex, 1)
    } else {
      newVocabularyGame[state.randomIndex].count -= 1
    }
    const randomIndex = generateRandom(0, newVocabularyGame.length)
    const randomTypeAny = generateRandom(1, 3)
    setState({
      ...state,
      mustShow: false,
      vocabularyGame: newVocabularyGame,
      randomIndex: randomIndex,
      randomType: randomTypeAny === 1 ? 1 : 2,
    })
  }

  const handleOnClickFailButton = () => {
    const randomIndex = generateRandom(0, state.vocabularyGame.length)
    const randomTypeAny = generateRandom(1, 3)

    setState({
      ...state,
      mustShow: false,
      randomIndex: randomIndex,
      randomType: randomTypeAny === 1 ? 1 : 2,
    })
  }

  const handleOnClickShowButton = (): void => {
    setState({ ...state, mustShow: true })
  }

  const handleOnChangeRowSelection = (rows: Array<any>) => {
    let newSelectedVocabulary: Array<Vocabulary> = []

    rows.forEach((row) => {
      newSelectedVocabulary.push({ ...state.vocabulary[row] })
    })
    setState({ ...state, selectedVocabulary: newSelectedVocabulary })
  }

  const getVocabularyData = (): Array<VocabularyRow> => {
    return convertToRowData(state.vocabulary)
  }

  const displayTranslation = (): JSX.Element => {
    if (!state.mustShow) return <></>
    if (state.randomType === 1) {
      return (
        <Styled.GameCenterTranslation>
          {state.vocabularyGame[state.randomIndex].translation}
        </Styled.GameCenterTranslation>
      )
    } else {
      return (
        <Styled.GameCenterTranslation>
          {state.vocabularyGame[state.randomIndex].word}
          <Styled.GameCenterPronunciation>
            ({state.vocabularyGame[state.randomIndex].pronunciation})
          </Styled.GameCenterPronunciation>
        </Styled.GameCenterTranslation>
      )
    }
  }

  const displayButtons = (): JSX.Element => {
    if (state.mustShow === false) {
      return (
        <Styled.GameCenterShowButton onClick={handleOnClickShowButton}>
          Montrer
        </Styled.GameCenterShowButton>
      )
    } else {
      return (
        <Styled.GameCenterButtons>
          <Styled.GameCenterFailButton danger onClick={handleOnClickFailButton}>
            Mauvais
          </Styled.GameCenterFailButton>
          <Styled.GameCenterSuccessButton
            type="primary"
            onClick={handleOnClickSuccessButton}
          >
            Bon
          </Styled.GameCenterSuccessButton>
        </Styled.GameCenterButtons>
      )
    }
  }

  const displayWord = (): JSX.Element => {
    if (state.randomType === 1) {
      return (
        <Styled.GameCenterWordTitle>
          {state.vocabularyGame[state.randomIndex].word}
        </Styled.GameCenterWordTitle>
      )
    } else {
      return (
        <Styled.GameCenterWordTitle>
          {state.vocabularyGame[state.randomIndex].translation}
        </Styled.GameCenterWordTitle>
      )
    }
  }

  const displayGame = (): JSX.Element => {
    if (state.vocabularyGame.length === 0) {
      return (
        <Styled.Home>
          <Styled.Game>
            <Styled.GameCenter>
              <Styled.GameCenterWordTitle>Bravo !</Styled.GameCenterWordTitle>
            </Styled.GameCenter>
          </Styled.Game>
        </Styled.Home>
      )
    }

    return (
      <Styled.Home>
        <Styled.Game>
          <Styled.GameCenter>
            <Styled.GameCenterQuestions>
              {state.vocabularyGame.length} questions restantes
            </Styled.GameCenterQuestions>
            <Styled.GameCenterQuestionsDivider />
            {displayWord()}
            {displayTranslation()}
            {displayButtons()}
          </Styled.GameCenter>
        </Styled.Game>
      </Styled.Home>
    )
  }

  const getRecurrenceOptions = (): Array<JSX.Element> => {
    const rows: JSX.Element[] = []

    for (let i = 0; i != 5; i += 1) {
      rows.push(
        <Styled.RecurrenceSelectOption value={i}>
          {i}
        </Styled.RecurrenceSelectOption>,
      )
    }
    return rows
  }

  const displayOptions = (): JSX.Element => {
    return (
      <Styled.Options>
        <Styled.AddWord>
          <Styled.FormAddWord
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={handleOnFinishAddWord}
            autoComplete={'off'}
          >
            <Styled.FormItemAddWord
              name="word"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Styled.AddWordInput placeholder="Mot ou expression" />
            </Styled.FormItemAddWord>
            <Styled.FormItemAddWord
              name="pronunciation"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Styled.AddWordInput placeholder="Prononciation" />
            </Styled.FormItemAddWord>
            <Styled.FormItemAddWord
              name="translation"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Styled.AddWordInput placeholder="Traduction" />
            </Styled.FormItemAddWord>
            <Styled.FormItemAddWord>
              <Styled.AddWordButton type="primary" htmlType="submit">
                Ajouter un mot
              </Styled.AddWordButton>
            </Styled.FormItemAddWord>
          </Styled.FormAddWord>
        </Styled.AddWord>
        <Styled.RecurrenceOption>
          <Styled.RecurrenceTitle>
            Nombre de répétitions:
          </Styled.RecurrenceTitle>
          <Styled.RecurrenceSelect
            defaultValue={1}
            onChange={(value: any) =>
              setState({ ...state, recurrenceCounter: value })
            }
          >
            {getRecurrenceOptions()}
          </Styled.RecurrenceSelect>
        </Styled.RecurrenceOption>
      </Styled.Options>
    )
  }

  const display = (): JSX.Element => {
    if (!state.isStarted) {
      return (
        <Styled.Home>
          <Styled.Start>
            <Styled.StartButton type="primary" onClick={handleOnClickStart}>
              Start
            </Styled.StartButton>
          </Styled.Start>
          <Styled.VocabularyTableSection>
            {displayOptions()}
            <Styled.VocabularyTable
              columns={getColumns(handleOnClickDeleteButton)}
              dataSource={getVocabularyData()}
              rowSelection={{
                type: 'checkbox',
                ...getRowSelection(handleOnChangeRowSelection),
              }}
            ></Styled.VocabularyTable>
          </Styled.VocabularyTableSection>
        </Styled.Home>
      )
    }
    return displayGame()
  }

  return (
    <>
      <Styled.Banner>
        <Styled.BannerTitle>Vocabulaire</Styled.BannerTitle>
      </Styled.Banner>
      {display()}
    </>
  )
}

export default Home
