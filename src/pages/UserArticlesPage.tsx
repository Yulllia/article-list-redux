import React from 'react'
import AddForm from '../components/addForm/AddForm'
import ArticleList from '../components/list/ArticleList'

function UserArticlesPage() {
  return (
    <div>
      <h4>Add new article</h4>
      <AddForm />
      <ArticleList />
    </div>
  )
}

export default UserArticlesPage