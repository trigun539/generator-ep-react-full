import React, { Component } from 'react';
import { connect }          from 'react-redux';
import styles               from './styles.css';

export class App extends Component {

	render () {
		const { children } = this.props;

		return (
			<div className={ styles.app } >
				{ children }
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
}

const mapStateToProps = (state) => {
	return {
		appName:  state.get('config').get('appName')
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
