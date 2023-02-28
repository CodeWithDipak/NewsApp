import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProp = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }

    static propType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalized = (string)=>{
        let newString = string.toLowerCase();
        return newString.charAt(0).toUpperCase() + newString.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
        document.title = `${this.capitalized(this.props.category)} - NewsMonkey`;
    }


    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08b6f09833ec47d3875386c1379ce324&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        });
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.componentDidMount();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.componentDidMount();

    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey - Top {this.capitalized(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className='row' >
                    {this.state.articles.map((element) => {
                        return (!this.state.loading && <div className='col-md-3' key={element.url}>
                            <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>)
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
