import styled from "styled-components";

import { Button, Table, Input, Form, Divider, Select } from 'antd';

export const Banner = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ff9626;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BannerTitle = styled.div`
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

export const Home = styled.div`
  overflow: auto;
`;

export const Start = styled.div`
  width: 100%;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StartButton = styled(Button)`
  width: 200px;
  height: 100px;
  font-size: 22px;
  border-radius: 10px;
`;

export const VocabularyTableSection = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  margin-right: 50px;
`;

export const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AddWord = styled.div`
`;

export const FormAddWord = styled(Form)`

`;

export const FormItemAddWord = styled(Form.Item)``;

export const AddWordInput = styled(Input)``;

export const AddWordButton = styled(Button)`

`;

export const VocabularyTable = styled(Table)`
  margin-top: 20px;

`;

export const DeleteButtonRow = styled(Button)`

`;

export const Game = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameCenter = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameCenterQuestions = styled.div`
  font-size: 20px;
  color: black;
`;

export const GameCenterQuestionsDivider = styled(Divider)``;

export const GameCenterWordTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: black;
`;

export const GameCenterTranslation = styled.div`
  width: 500px;
  height: 50px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  font-weight: 400;
`;

export const GameCenterPronunciation = styled.span`
  color: #9e9e9e;
  margin-left: 5px;
`;

export const GameCenterShowButton = styled(Button)`
  width: 500px;
  margin-top: 70px;
`;

export const GameCenterButtons = styled.div`
  width: 500px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GameCenterFailButton = styled(Button)``;

export const GameCenterSuccessButton = styled(Button)``;

export const RecurrenceOption = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RecurrenceTitle = styled.span`
  font-size: 15px;
  color: black;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RecurrenceSelect = styled(Select)``;

export const RecurrenceSelectOption = styled(Select.Option)``;