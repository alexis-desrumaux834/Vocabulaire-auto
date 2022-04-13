import { VocabularyRow } from 'common/types'
import React from 'react'

//css
import { DeleteButtonRow } from 'styles/pages/home'

export const getColumns = (deleteFunction: (index: number) => void) => {
  const columns = [
    {
      title: 'Mot/Expression',
      dataIndex: 'word',
      key: 'word',
      render: (word: any) => <>{word}</>,
    },
    {
      title: 'Prononciation',
      dataIndex: 'pronunciation',
      key: 'pronunciation',
    },
    {
      title: 'Traduction',
      dataIndex: 'translation',
      key: 'translation',
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (row: VocabularyRow, record: any, index: number) => {
        return (
          <DeleteButtonRow danger onClick={() => deleteFunction(index)}>
            Delete
          </DeleteButtonRow>
        )
      },
    },
  ]
  return columns
}

export const getRowSelection = (onChange: (rows: React.Key[]) => void) => {
  const rowSelections = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      onChange(selectedRowKeys);
    },
  }
  return rowSelections;
}
