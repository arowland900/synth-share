import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import httpClient from './httpClient'
import NavBar from './NavBar';      
import Home from './views/Home'
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import VIP from './views/VIP';
import LogOut from './views/LogOut';
import Settings from './views/Settings';


class App extends Component {

	state = {
		currentUser: httpClient.getCurrentUser()
	}

	onAuthSuccess() {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	onLogOutSuccess() {
		this.setState({ currentUser: null })
	}

	


	render() {
		return (
			<div className="App container">
				<NavBar currentUser={this.state.currentUser} />
				<Switch>
					<Route path='/signup' render={(routeProps) => {
						return <SignUp { ...routeProps } onSignUpSuccess={this.onAuthSuccess.bind(this)} />
					}} />
					<Route path='/login' render={(routeProps) => {
						return <LogIn { ...routeProps } onLogInSuccess={this.onAuthSuccess.bind(this)} />
					}} />
					<Route path='/logout' render={((routeProps) => {
						return <LogOut { ...routeProps } onLogOutSuccess={this.onLogOutSuccess.bind(this)} />
					})} />
					<Route path='/settings' render={((routeProps) => {
						return this.state.currentUser
							? <Settings { ...routeProps } onDeleteSuccess={this.onLogOutSuccess.bind(this)} />
							: <Redirect to="/login" />
					})} />
					<Route path='/vip' render={((routeProps) => {
						return this.state.currentUser
							? <VIP {...routeProps} />
							: <Redirect to="/login" />
					})} />
					<Route exact path='/' component={Home} />
 				</Switch>
				
			</div>
		);
	}
}

export default App;
