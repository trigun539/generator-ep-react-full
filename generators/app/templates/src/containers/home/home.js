import React, { Component } from 'react';
import Immutable            from 'immutable';
import { connect }          from 'react-redux';
import styles               from './styles.css';
import { push }             from 'react-router-redux';

export class Home extends Component {

	render () {
		const { push } = this.props;

		return (
			<div className={ styles.home } >
			  <h1>Home</h1>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		push (page) { dispatch(push(page)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home); 
