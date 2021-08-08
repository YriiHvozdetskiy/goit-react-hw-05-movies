import {useHistory, useLocation} from "react-router-dom";
import {useRef, useEffect} from 'react'

export const useGoBack = () => {
	const routeState = useRef()
	const location = useLocation()
	const history = useHistory()

	// записуєм в Ref щоб значення зберігалося після ререндеру компоненти
	//location.state зберігається обєкт який передали в Link/Navlink to {pathname: `movies/${movie.id}`,state: {from: '/'},} -- з сторінки з якої ми прийшли
	useEffect(() => {
		if (routeState.current) return
		routeState.current = location.state
	}, [])

	//визивається при onClick на кнопці "назад"
	const handleGoBack = () => {
		//якщо зайшли з нової сторінки чи перезагрузили сторінку провіряєм чи є щось в routeState.current в противному випадку переходем на HomePage
		const url = routeState.current ? routeState.current.from : '/'
		// записуєм в історію куда потрібно перейти , а Route рендерить потрібну компоненту
		history.push(`${url}`)
	}
	// повертаєм  обєкт з методом, щоб використовувати через кастомний хук в іншій компоненті
	return {goBack: handleGoBack}
}