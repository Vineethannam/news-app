import React, { useEffect,useState } from 'react';
import { props } from 'react-infinite-scroll-component';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{



  
    const[articles,setArticles]=useState([])
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)
    const[loading,setLoading]=useState(true)
    
    const captialization=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1)
    }
    // constructor(props) {
      //   super(props);
      
      // }
      
      const updateNews = async ()=> {
        props.setProgress(10)
        console.log("Previous btn");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5122a900779d45998e404e01823ec8dc&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(70)
        // console.log(data);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100)
      }
      
      useEffect(()=>{
        updateNews()
        document.title = `${captialization(props.category)} - NewsMonkey`;
  },[])
  // async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5122a900779d45998e404e01823ec8dc&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // });
    // console.log(data);
    // console.log(parsedData);
    // console.log(this.state.articles.map((item)=>item));
    
  // }

 const handlePrevClick = async () => {

    // console.log("Previous btn");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5122a900779d45998e404e01823ec8dc&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});  
    // let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(data);
    //   console.log(parsedData);
    //   this.setState({
    //     page : this.state.page -1,
    //     articles: parsedData.articles, 
    //     loading: false 
    //   })

    // this.setState({ page: this.state.page - 1 })
    setPage(page-1)
    updateNews()
  }

  const handleNextClick = async () => {
    // console.log("Next btn");
    // if(!(this.state.page +1 > Math.ceil( this.state.totalResults/props.pageSize))){

    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5122a900779d45998e404e01823ec8dc&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(data);
    //   console.log(parsedData);
    //   this.setState({
    //     page : this.state.page +1,
    //     articles: parsedData.articles, 
    //     loading: false 
    //   })
    // }
    // this.setState({ page: this.state.page + 1 })
    setPage(page+1)
    updateNews()
  }

   const fetchMoreData = async() => {
    // this.setState({page:this.state.page+1})
    setPage(page+1)
    console.log("Previous btn");
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5122a900779d45998e404e01823ec8dc&page=${page +1}&pageSize=${props.pageSize}`;
    setLoading(true)

    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(data);
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   loading: false
    // }) 
   };


    return (
      <>
        <h2 className='text-center' style={{ margin: '30px 0px' }}>NewsMonkey - Top {captialization(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
            <div className="container">

        <div className="row" >
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News

