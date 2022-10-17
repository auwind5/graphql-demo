import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Button, Table, message } from 'antd'
import BookInfoModal from './BookInfoModal'
import QueryResult from '../components/query-result'

/** GET_BOOKS gql query to retrieve all books */
const GET_BOOKS = gql`
  query getBooks {
    booksForTable {
      BookID
      Author
      BookName
      City
      ShelfID
    }
  }
`

/**
 * Mutation to modify book's info.
 */
const MODIFY_BOOK_INFO = gql`
  mutation ModifyBookInfo($bookInfo: BookArgs!) {
    modifyBookInfo(bookInfo: $bookInfo) {
      code
      success
      message
      bookInfo {
        BookID
      }
    }
  }
`

export default function Book() {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS)
  const [books, setBooks] = useState(data?.booksForTable)
  const [visible, setVisible] = useState(false)
  const [model, setModel] = useState('')
  const [record, setRecord] = useState({})
  const [modifyBookInfo] = useMutation(MODIFY_BOOK_INFO, {
    refetchQueries: [{ query: GET_BOOKS }],
  })

  useEffect(() => {
    setBooks(data?.booksForTable)
  }, [data])

  const columns = [
    {
      title: 'Book ID',
      dataIndex: 'BookID',
      key: 'BookID',
    },
    {
      title: 'Book Name',
      dataIndex: 'BookName',
      key: 'BookName',
    },
    {
      title: 'Author',
      dataIndex: 'Author',
      key: 'Author',
    },
    {
      title: 'Shelf',
      dataIndex: 'ShelfID',
      key: 'ShelfID',
    },
    {
      title: 'City',
      dataIndex: 'City',
      key: 'City',
    },
    {
      title: 'Operate',
      key: 'operate',
      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={modifyHandler(record)}
            style={{
              backgroundColor: '#67c23a',
              borderColor: '#67c23a',
              marginRight: '5px',
            }}
          >
            Modify
          </Button>
        </>
      ),
    },
  ]
  const handleSubmit = (values) => {
    modifyBookInfo({
      variables: {
        bookInfo: { BookID: record.BookID, ...values },
      },
    })
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible((prev) => !prev)
  }

  const getData = () => {
    refetch()
  }

  const modifyHandler = (record) => () => {
    setModel('PUT')
    setRecord(record)
    setVisible(true)
  }

  return (
    <>
      <div className="book-table">
        <div className="button-container">
          <Button type="primary" onClick={getData}>
            GET
          </Button>
        </div>
        <QueryResult error={error} loading={loading} data={data}>
          <Table
            columns={columns}
            dataSource={books?.map((e) => ({
              key: e.BookID,
              ...e,
            }))}
          ></Table>
        </QueryResult>
      </div>
      <BookInfoModal
        model={model}
        rowData={record}
        isModalVisible={visible}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      ></BookInfoModal>
    </>
  )
}
