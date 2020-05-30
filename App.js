
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './src/context/Context'
const Stack = createStackNavigator();
import BlogList  from './src/screens/BlogList'
import BlogDetails  from './src/screens/BlogDetails'
import CreateBlog  from './src/screens/CreateBlog'
const { Navigator, Screen } = Stack;
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'

const App = () => {

  const menus = [
    { name: "BlogList", component: BlogList, options: { title: 'Blogs' } },
    { name: "BlogDetails", component: BlogDetails, options: { title: 'BlogDetails' } },
    { name: "CreateBlog", component: CreateBlog, options: { title: 'CreateBlog' } },
  ]

  return (
    <Provider>
      <NavigationContainer>
        <Navigator initialRouteName="BlogList" headerMode="screen" screenOptions={{ headerTintColor: 'white', headerStyle: { backgroundColor: 'tomato' }, }}>
          {menus.map((temp, index) => (
            <Screen name={temp.name} key={index} component={temp.component} options={temp.options} />
          ))}
        </Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;