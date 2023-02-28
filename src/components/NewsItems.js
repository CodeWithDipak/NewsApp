import React, { Component } from 'react'


export default class NewsItems extends Component {
    render() {
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!this.props.imgUrl ? "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png" : this.props.imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <p className="card-text"><small className="text-muted">Released on {new Date(this.props.date).toGMTString()}</small></p>
                        <a href={this.props.newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
