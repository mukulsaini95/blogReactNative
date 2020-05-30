import React, { useState, useReducer } from 'react';
import createDataContext from "./createDataContext"
import axios from 'axios';


// const BlogContext = React.createContext();
import { uIdGenerator } from "../../commonUtils"
import api from '../api/api';


const blogReducer = (state, action) => {
	switch (action.type) {
		case "addPost":
			let originalState = [...state]
			let payload = action.payload
			if (action.payload.id) {
				originalState = originalState.map(temp => {
					if (temp.id === action.payload.id) {
						temp = action.payload
					}
					return temp;
				})
			} 
			return [...originalState];
		case "deletePost":
			return [...state].filter((temp) => temp.id !== action.id);
		case "GET_ALL_BLOG":
			return [...action.response];
		default:
			return state;
	}

}

// const addBlogPost = (dispatch) => {
// 	return () => {
// 		dispatch({ type: "addPost" })
// 	}
// }

// const deletePost = (dispatch) => {
// 	return (id) => {
// 		dispatch({ type: "deletePost", id })
// 	}
// }

const allConstant = [
	{
		actionName: "addPost",
		params: ["payload"]
	},
	{
		actionName: "deletePost",
		params: ["id"]
	}
]

// allConstant.map(constant => {
// 	allActions[constant.actionName] = (dispatch) => {
// 		return (payload, callback) => {
// 			let obj = {
// 				type: constant.actionName
// 			}
// 			constant.params.map((temp, index) => {
// 				obj[temp] = payload[temp];
// 			})
// 			dispatch(obj)
// 			callback && callback();
// 		}
// 	}
// })

const getAllBlogs = (dispatch) => {
	return async () => {
		const response = await api.get("/blogPosts");
		console.log('response: ');
		dispatch({ type: "GET_ALL_BLOG", response:response.data })
	}
}


const addPost = ( dispatch) =>{
	return async (payload,callback) => {
		if(payload.id){
			await api.put(`/blogPosts/${payload.id}`,payload);
		}else{
			await api.post(`/blogPosts`,payload);
		}
		dispatch({ type: "addPost", payload})
		callback()
	}
}



const deletePost = ( dispatch) =>{
	return async (id) => {
			await api.delete(`/blogPosts/${id}`);
		dispatch({ type: "deletePost", id})
	}
}

let allActions = {
	getAllBlogs,
	addPost,
	deletePost
};



// export const BlogProvider = ({ children }) => {
// 	const [blogPosts, dispatch] = useReducer(blogReducer, []);


// const addBlogPost = () => {
// 	// setBlogPosts([...blogPosts, { title: `blog ${blogPosts.length}`, id: uIdGenerator }])
// 	dispatch({ type: "addPost" })
// }
// 	return <BlogContext.Provider value={{
// 		data: blogPosts,
// 		addBlogPost
// 	}}>
// 		{children}
// 	</BlogContext.Provider>
// }

// export default BlogContext;

export const { Context, Provider } = createDataContext(blogReducer, {...allActions}, [])


