import React, { useState, useEffect } from 'react'
import { getUsers } from '../../../redux/users-reducer';
import { useDispatch } from 'react-redux';
import s from './Pagination.module.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = (props) => {

	const dispatch = useDispatch()
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);


	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let amountOfPages = 10;

	const [count, setCount] = useState(0)
	let countMax = count + amountOfPages;


	let visiblePages = pages.filter(p => p > count && p <= countMax)

	useEffect(() => {
		dispatch(getUsers(count + 1, props.pageSize))
	}, [count])
	return (
		<div className={s.paginator}>
			{count >= 10 &&
				<div
					className={s.arrow}
					onClick={() => setCount(count - 10)}>
					<FaArrowLeft />
				</div>}
			{visiblePages.map((p) => {
				return (
					<span
						key={p}
						className={`${ s.countsPages } ${ props.currentPage === p && s.selectedPage }`}
						onClick={() => {
							props.onPageChanged(p);
						}}
					>
						{p}
					</span>
				);
			})}
			{count < Math.floor(pagesCount / 10) * 10 &&
				<div
					className={s.arrow}
					onClick={() => setCount(count + 10)}
				>
					<FaArrowRight />
				</div>}
		</div>
	)
}

export default Pagination
