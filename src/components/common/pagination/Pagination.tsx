import React, { useState, FC, memo, useEffect } from 'react'
import s from './Pagination.module.scss'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type Props = {
  totalUsersCount: number
  pageSize: number
  currentPage: number

  onPageChanged: (pageNr: number) => void
}

const Pagination: FC<Props> = memo((props) => {
  const [count, setCount] = useState(1)
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let visiblePages = pages.filter((p) => p >= count && p <= count + 9)
  useEffect(() => {
    setCount(Math.floor(props.currentPage / 10)*10 + 1 )
  }, [props.currentPage])

  return (
    <div className={s.paginator}>
      {count >= 10 && (
        <div
          className={s.arrow}
          onClick={() => {
            props.onPageChanged(count - 10)
          }}
        >
          <FaArrowLeft />
        </div>
      )}
      {visiblePages.map((p) => {
        return (
          <span
            key={p}
            className={`${s.countsPages} ${
              props.currentPage === p && s.selectedPage
            }`}
            onClick={() => {
              props.onPageChanged(p)
            }}
          >
            {p}
          </span>
        )
      })}
      {count < Math.floor(pagesCount / 10) * 10 && (
        <div
          className={s.arrow}
          onClick={() => {
            props.onPageChanged(count + 10)
          }}
        >
          <FaArrowRight />
        </div>
      )}
    </div>
  )
})

export default Pagination
