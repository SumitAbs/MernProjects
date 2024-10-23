import React, {Component} from 'react';
import NewsItem from "./NewsItem";

class News extends Component {
    constructor() {
        super();
        this.state={
            articles: [],
            loading : false
        }
    }
    async  componentDidMount() {
        let url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=f2e575121e6a46f5b7d7b0d290f53b93";
        let data = await fetch(url);
        let parsedData =  await data.json();
        this.setState({articles: parsedData.articles})
    }

    render() {
        return (
            <div className="container my-3">
                <h2>News App </h2>
                <div className="row">
                    {this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description:""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url?element.url:""} />
                            </div>
                        }
                    )}
                </div>
            </div>
        );
    }
}

export default News;