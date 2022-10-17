import React, { useState } from 'react'
import { Button, Table, message } from 'antd'
import { base_url, getBookByID } from '../api/endpoints'
import BookInfoModal from './BookInfoModal'

export default function Book() {
  const [data, setData] = useState()
  const [visible, setVisible] = useState(false)
  const [model, setModel] = useState('')
  const [record, setRecord] = useState({})

  const columns = [
    {
      title: 'Book ID',
      dataIndex: 'bookID',
      key: 'bookID',
    },
    {
      title: 'Book Name',
      dataIndex: 'bookName',
      key: 'bookName',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Shelf',
      dataIndex: 'shelfID',
      key: 'shelfID',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
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
    console.log('------model', model)
    switch (model) {
      case 'PUT':
        fetchFuc('http://localhost:3000/api/modifyBookInfo', model, {
          bookID: record.bookID,
          ...values,
        })
        break
      case 'PATCH':
        fetchFuc('http://localhost:3000/api/modifyPartialBookInfo', model, {
          bookID: record.bookID,
          ...values,
        })
        break
      case 'DELETE':
        console.log('------delete bookID', record.bookID)
        fetchFuc('http://localhost:3000/api/deleteBookByID', model, {
          bookID: record.bookID,
        })
        break
      case 'POST':
        fetchFuc('http://localhost:3000/api/addBook', model, values)
        break
      default:
        break
    }
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
        message.info(`name got from response headers: ${res.headers.get('name')}`)
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
        setData(result)
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
        <Table columns={columns} dataSource={data}></Table>
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
