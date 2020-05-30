import React, { useContext ,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import { Context as BlogContext } from '../context/Context';
import { Feather } from "@expo/vector-icons"
const BlogList = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{padding:20}}>

				<TouchableOpacity   onPress={() => navigation.navigate("CreateBlog", {})} >
					<Feather name="plus"  size={30}></Feather>
				</TouchableOpacity>
				</View>
			),
		}, (navigation));
	}, [navigation])

	
	
	const { state, addPost, deletePost ,getAllBlogs} = useContext(BlogContext);
		useEffect(()=>{
			getAllBlogs()

			const listener = navigation.addListener('focus',()=>{
				getAllBlogs()
			})
			return ()=>{
				listener && listener.remove()
			}
		},[])

	return <View style={{ flex: 1 }}>
		{/* <Button onPress={() => { addPost() }} title="Add Post" /> */}
		{state.length > 0 ?
			<FlatList
				data={state}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (<TouchableOpacity onPress={() => navigation.navigate("BlogDetails", { id: item.id })}>
					<View style={styles.view}>
						<View style={{ flex: .9,padding:4 }}>
							<Text>{item.title}</Text>
						</View>
						<View style={{ flex: .1, padding:4,marginRight:10,flexDirection:"row",justifyContent:"space-between"}}>
							<TouchableOpacity style={{marginRight:5}} onPress={() => navigation.navigate("CreateBlog", { id: item.id })}>
								<Feather name="edit" size={24}></Feather>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => deletePost(item.id )}>
								<Feather name="trash"size={24}></Feather>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableOpacity>)}
			/>
			:
			<View style={{top:"50%"}}>
				<Text style={{ fontSize: 20, alignSelf: 'center'}}>No data Found!</Text>
			</View>
		}
	</View>
}


const styles = StyleSheet.create({
	view: {
		borderBottomWidth: 2,
		flexDirection: "row",
		padding: 10,
		width: "100%",
		borderColor: 'black'
	}
})

export default BlogList;