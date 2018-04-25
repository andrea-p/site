import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import authorData from '../generated-authors.json'
import defaultThumbnail from '../../../assets/images/platform_4.gif'
import styles from './styles.css'
import { getCategoryNameFromPath } from '../util'

const BlogPreview = ({ page }) => {
  let author

  let thumbnail = defaultThumbnail

  const category = page.category
    ? page.category
    : null

  const date = page.date
    ? page.date.replace(new RegExp('-', 'g'), '.')
    : null

  const authorsLabel = page.authors
    ? (arrayOfNames => {
        return `Written by ${ arrayOfNames.length > 1
          ? (() => {
              const last = arrayOfNames.pop()
              return `${ arrayOfNames.join(', ') } and ${ last }`
            })()
          : arrayOfNames[0] }`
      })(page.authors.map(e => authorData[e].name))
    : null

  if (page.draft) {
    return null
  }
  if (page.thumbnail) {
    thumbnail = page.thumbnail
  }

  // so we don't have to re-write with 'to' prop
  const PostLink = props => (
    <Link
      to={ page.__url }
      { ...props }
    />
  )

  return (

    <div className={ styles.container }>
      <div>

        <div className={ styles.details }>

          <div className={ styles.categoryAndDate }>
            <Link to={ `/blog/category/${ category }` }>
              <div>
                { getCategoryNameFromPath(category) }
              </div>
            </Link>
            { /* ^ Link + flexbox = deleting the nbsp before the dash (instead, we can use padding-left on date) */ }
            <div className={ styles.date }>{ ` - ${ date }` }</div>
          </div>

          <PostLink>
            <div className={ styles.title }>
              { page.title }
            </div>
          </PostLink>

          <div className={ styles.description }>{ page.description }</div>

          <div className={ styles.authors }>{ authorsLabel }</div>

        </div>

        <PostLink className={ styles.imageContainer }>
          <div
            className={ styles.image }
            style={{ backgroundImage : `url(${ thumbnail})` }}
          />
        </PostLink>

      </div>
    </div>

  )
}

BlogPreview.propTypes = {
  page: PropTypes.object
}

export default BlogPreview