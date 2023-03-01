import React from 'react'

 const NewsItems = (props)=> {
   
        return (
            <div className='my-2'>
                <div className="card" >
                    <img src={!props.imgUrl ? "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png" : props.imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-muted">Released on {new Date(props.date).toGMTString()}</small></p>
                        <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItems