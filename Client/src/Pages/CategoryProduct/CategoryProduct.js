import "./CategoryProduct.css"
import { useState, useEffect } from "react";
import ListItem from "../../Components/ListItem/ListItem"
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector} from 'react-redux'
import { fetchProduct } from "../../Redux/Slice/productSlice"
import { filterProduct } from "../../Redux/Slice/productSlice"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import ResponsivePagination from "react-responsive-pagination";
function CategoryProduct() {
    const [type, setType] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [company, setCompany] = useState('');
    const location = useLocation();
    const dataAll = location.state;
    
    let filter=useSelector((state) => state.product.product);
    let data=filter;
    // useEffect(() => {
    //     data=useSelector((state) => state.product.product);
    // },[]);
    if(dataAll!=null){
        data=dataAll
    }
    let dispatch = useDispatch()
    useEffect(()=>{
        data = filter;
    },[]);

    const handleSelectTypeChange = (event) => {
        setType(event.target.value);
    };
    const handleSelectPriceChange = (event) => {
        if (event.target.value==='1'){
            setMaxPrice(2000000)
        }
        else if (event.target.value==='2'){
            setMaxPrice(10000000);
            setMinPrice(2000000)
        }
        else if (event.target.value==='3'){
            setMaxPrice(17000000);
            setMinPrice(10000000)
        }
        else if (event.target.value==='4'){
            setMinPrice(17000000);
            setMaxPrice(250000000)
        }
        else {
            setMinPrice(0);
            setMaxPrice(0);
        }
    }
    const handleSelectCompanyChange = (event) => {
        setCompany(event.target.value);
    };
    const handleSubmit=async (event) => {
        event.preventDefault()
        let Type = type;
        let MinPrice = minPrice;
        let MaxPrice = maxPrice;
        let Company = company;
            // let checker = validData({UserName: UserName, Password: Password})
            // if(true) {
            await dispatch(filterProduct({Type: Type, MinPrice: MinPrice, MaxPrice: MaxPrice, Company: Company}))
            // }
            // dispatch(filterProduct())
    }




    const [itemOffset, SetOffset] = useState({ offset: 0, current: 0 });
    const itemPerPage = 20;
    const endOffset = itemOffset.offset + itemPerPage;
    const product = data.slice(itemOffset.offset, endOffset);
    const countPage = Math.ceil(data.length / itemPerPage);
    const handelPagination = (event) => {
        const newOffset = ((event - 1) * itemPerPage) % data.length; //event start from 1
        SetOffset({ offset: newOffset, current: event });
    };
    return(
        <div className="CategoryProduct" >
                <div className="grid">
                    <div className="CategoryProduct-row">
                        {/* <div className="grid__column-1667 m-2">
                            <nav className="category">
                                <h3 className="category__heading">
                                    <i className="category__heading-icon fa-solid fa-list-ul"></i>
                                    Tất cả danh mục
                                </h3>
                            </nav>
                        </div> */}
                        <div className="grid__column100">
                            <div className="home-filter">
                                <span className="home-filter__label"> Sắp xếp theo</span>
        
                                <form name="form" onSubmit={handleSubmit} className="filter-form">
                                    <select className="select-input" name='selectPrice'>
                                        <option className="optionSelect" value='0' onChange={handleSelectPriceChange}> Giá</option> 
                                        <option className="optionSelect" value='1'>400.000đ - 2000.000đ</option>
                                        <option className="optionSelect" value='2'>2000.000đ - 10.000.000đ</option>
                                        <option className="optionSelect" value='3'>10.000.000đ - 17.000.000đ</option>
                                        <option className="optionSelect" value='4'>17.000.000đ-25.000.000đ</option>
                                    </select>
                                    <select className="select-input" name='selectCompany' onChange={handleSelectCompanyChange}>
                                        <option className="optionSelect" value=''>Hãng</option> 
                                        <option className="optionSelect" value='Aukey'>Aukey</option>
                                        <option className="optionSelect" value='Asus'>Asus</option>
                                        <option className="optionSelect" value='Apple'>Apple</option>
                                        <option className="optionSelect" value='Dell'>Dell</option>
                                        <option className="optionSelect" value='Samsung'>Samsung</option>
                                        <option className="optionSelect" value='Oppo'>Oppo</option>
                                        <option className="optionSelect" value='Xiaomi'>Xiaomi</option>
                                        <option className="optionSelect" value='Logitech'>Logitech</option>
                                        <option className="optionSelect" value='JBL'>JBL</option>
                                        <option className="optionSelect" value='MSI'>MSI</option>
                                    </select>
                                    <select className="select-input" name='selectType' onChange={handleSelectTypeChange}>
                                        <option className="optionSelect" value=''> Loại</option> 
                                        <option className="optionSelect" value='Máy Tính'>Máy Tính</option>
                                        <option className="optionSelect" value='Điện thoại'>Điện thoại</option>
                                        <option className="optionSelect" value='Phụ kiện'>Phụ kiện</option>
                                    </select>
                                    {/* <input className='Type' name='Type' value=''/> */}
                                    <button className="filter-btn">
                                        Lọc
                                    </button>
                                </form>

                                {/* <div className="home-filter__page">
                                    <div className="home-filter__page-num">
                                        <span className="home-filter__page-cur"></span>
                                
                                    </div>
                                    <div className="home-filter__controls">
                                        <a className="home-filter__back home-filter__btn--disabled" href="#">
                                            <i className="icon-back fa-solid fa-angle-left"></i>
                                        </a>
                                        <a className="home-filter__next " href="#"> 
                                            <i className="icon-next fa-solid fa-angle-right"></i>
                                        </a>
        
                                    </div>
                                </div> */}
                                
                            </div>
                            <div className="home-product">
                                <div className="grid__row">
                                <div className="list-item">
                                    {
                                    product.map((item) => {return (
                                        <div className="item-wrap">
                                            <Link to={`/ProductDetail/${item.ID}`}>
                                                <img src={item.Image} className="img-thumbnail" alt="Cinque Terre"/>
                                                <div className="item__price">{item.Name}</div>
                                            </Link>
                                        
                                        <div className="item__price">{item.Price} Đ</div>
                                    </div>
                                        )
                                    })}
                                </div>
                                </div>
                                
                            </div>
                            
                            <div classsName = "pagination"
                            // className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center "
                            // id="bottom-right"
                            >
                                <ResponsivePagination
                                    current={itemOffset.current}
                                    total={countPage}
                                    onPageChange={handelPagination}
                                />
                            </div>
                        </div>
                    </div>
                </div>  
        </div>
    )
}
export default CategoryProduct;
