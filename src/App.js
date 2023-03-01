import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default function App (){

  const apiKey = process.env.REACT_APP_NEWS_API

  const [state, setState] = useState({progress: 0})  
  
  const setProgress = (progress)=>{
    setState({
      progress: progress
    })
  }
  
    return (
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={state.progress}
      />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="home" country="in" category="entertainment" />} />
          <Route exact path="/business" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="business"  country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="entertainment"  country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="health"  country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="science"  country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="sports"  country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="technology"  country="in" category="technology" />} />
          <Route exact path="/politics" element={<News setProgress = {setProgress} apiKey = {apiKey}   key="politics"  country="in" category="politics" />} />
        </Routes>
      </BrowserRouter>
    )
  }
