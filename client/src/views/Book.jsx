import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Button, Table, message } from 'antd'
import BookInfoModal from './BookInfoModal'
import QueryResult from '../components/query-result'

/** GET_BOOKS gql query to retreive all books */
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
  const { loading, error, data } = useQuery(GET_BOOKS)
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
            onClick={putHandler(record)}
            style={{
              backgroundColor: '#67c23a',
              borderColor: '#67c23a',
              marginRight: '5px',
            }}
          >
            PUT
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={patchHandler(record)}
            style={{
              backgroundColor: '#67c23a',
              borderColor: '#67c23a',
              marginRight: '5px',
            }}
          >
            PATCH
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={deleteHandler(record)}
            style={{
              backgroundColor: '#f56c6c',
              borderColor: '#f56c6c',
              marginRight: '5px',
            }}
          >
            DELETE
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

  const fetchFuc = (url, method, data) => {
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setVisible(false)
        getData()
      })
  }

  const handleCancel = () => {
    setVisible((prev) => !prev)
  }

  const headHandler = () => {
    fetch('http://localhost:3000/api/getBookByID', { method: 'HEAD' }).then(
      (res) => {
        message.info(
          `name got from response headers: ${res.headers.get('name')}`
        )
      }
    )
  }

  const getData = () => {
    fetch('http://localhost:3000/api/getBookByID', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        const result = res.map((e) => {
          return {
            key: e.BookID,
            bookID: e.BookID,
            author: e.Author,
            bookName: e.BookName,
            city: e.City,
            shelfID: e.ShelfID,
          }
        })
        setBooks(result)
      })
  }

  const putHandler = (record) => () => {
    setModel('PUT')
    setRecord(record)
    setVisible(true)
  }

  const patchHandler = (record) => () => {
    setModel('PATCH')
    setRecord(record)
    setVisible(true)
  }

  const postHandler = () => {
    setModel('POST')
    setVisible(true)
  }

  const deleteHandler = (record) => () => {
    setModel('DELETE')
    setRecord(record)
    fetchFuc('http://localhost:3000/api/deleteBookByID', 'DELETE', {
      bookID: record.bookID,
    })
  }

  return (
    <>
      <div className="book-table">
        <div className="button-container">
          <Button
            type="primary"
            style={{ backgroundColor: '#dcdfe6', borderColor: '#dcdfe6' }}
            onClick={headHandler}
          >
            HEAD
          </Button>
          <Button type="primary" onClick={getData}>
            GET
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#e6a23c', borderColor: '#e6a23c' }}
            onClick={postHandler}
          >
            POST
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
