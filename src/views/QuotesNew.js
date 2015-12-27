import React from 'react'
import 'styles/core.scss'
import Firebase from 'firebase'
import constants from 'utils/constants'
import {reduxForm} from 'redux-form'

const ref = new Firebase(constants.FIREBASE)
const quotesRef = ref.child('quotes')
export const fields = ['title', 'description', 'author', 'tags', 'category']

export class QuotesNew extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
  }

  addOne (e) {
    e.preventDefault()
    console.log(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    let userId = this.props.auth.uid
    let title = this.refs.title.value
    let description = this.refs.description.value
    let author = this.refs.author.value
    let category = this.refs.category.value
    let tags = (this.refs.tags.value).split(',')

    quotesRef.push({
      title: title,
      text: description,
      author: author,
      category: category,
      createdBy: userId,
      createdAt: new Date(),
      tags: tags
    })
  }

  render () {
    const {
      fields: {title, description, author, tags, category},
      handleSubmit,
      resetForm,
      submitting
      } = this.props

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1>New Quote</h1>

          <div className='form-group'>
            <label forHtml='title'>Title</label>
            <input type='text' className='form-control' id='title' placeholder='Title (optional)' ref='title' {...title} />
          </div>

          <div className='form-group'>
            <label forHtml='description'>Description</label>
            <textarea className='form-control' rows='4' id='description' ref='description' placeholder='text or description' {...description} />
          </div>

          <div className='form-group'>
            <label forHtml='author'>Author</label>
            <input type='text' className='form-control' id='author' placeholder='author' ref='author' {...author} />
          </div>

          <div className='form-group'>
            <label forHtml='category'>Category</label>
            <input type='text' className='form-control' id='category' placeholder='category (quote, joke, etc)' ref='category' {...category} />
          </div>

          <div className='form-group'>
            <label forHtml='tags'>Tags</label>
            <input type='text' className='form-control' id='tags' placeholder='tags (comma separated)' ref='tags' {...tags} />
          </div>

          <input type='submit' value='Create quote' className='btn btn-primary' />

        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newQuote',
  fields,
  normalize: ['tags']
})(QuotesNew)
