import React, { useEffect, useState } from 'react'
import DEFAULT_OPTIONS from './DefaultOptions';
import '../Editor.css';
import myimg2 from './Images/akramKhan.jpg'
import Swal from 'sweetalert2';


const FilterSlider = ({ options, updateFilterOptions, index }) => {

  return (
    <div>
      <div
        className="p-3 fw-bold radius-curve"
        style={{ background: "#1a3847" }}
      >
        <label class="form-label text-white" for={options.property}>
          {options.name}
          {"   :   "}
          <span class="form-label-small">{options.value}</span>
        </label>
        <div class="range">
          <input
            onChange={(e) =>
              updateFilterOptions(index, parseInt(e.target.value))
            }
            value={options.value}
            type="range"
            class="form-range"
            min={options.range.min}
            max={options.range.max}
            id={options.property}
          // style={{backgoundColor: options.backgroundColor}}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};



const Filters = ({ filterList, setOptions }) => {

  return filterList.map((filter) => (
    <div className="card" onClick={e => setOptions(filter.filter)}>
      <img className='img-fluid' src={filter.image} />
      <div className="card-body">
        <p>{filter.title}</p>
      </div>
    </div>
  ))

}


const ImageEditor = () => {

  const [todoList, setTodoList] = useState([]);
  const removeToDo=(index)=>{
    let temp=todoList;
    temp.splice(index,1);
    setTodoList([...temp]);
}

const showToDoList=()=>{
  return todoList.map((task,i)=>(
      <div className='task'>
          <p>{task}</p>
          <button onClick={()=>{removeToDo(i)}}>
              <i class="fa fa-trash " aria-hidden="true"></i>
          </button>
      </div>
  ))
}

  const [mainImg, setMainImg] = useState(myimg2);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [filterName, setFilterName] = useState("");
  const filter=()=>{
    setTodoList([...todoList,filterName]);
    setFilterName("");
}

  const [filterList, setFilterList] = useState([]);

  const saveFilter = async () => {
    await fetch('http://localhost:7000/filter/add', {
      method: 'POST',
      body: JSON.stringify({
        title: filterName,
        image: mainImg,
        filter: options,
        user: currentUser._id,
        createdAt: new Date()
      }),
      headers : {
        'Content-Type' : 'application/json'
      }
    });

    // alert
    if(saveFilter.status === 200){
      console.log('filter added');
      Swal.fire({
          icon:'success',
          title:'Well Done',
          text:'Added Successfully'
      })  
  }
    

    fetchUserFilters();
  }
  

  const fetchUserFilters = async () => {
    const res = await fetch('http://localhost:7000/filter/getbyuser/'+currentUser._id)
    const data = await res.json();
    console.log(data);
    setFilterList(data);
  }

  useEffect(() => {
    fetchUserFilters()
  }, [])
  

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    // filters.push(`url(${mainImg})`);
    // console.log({ filter: filters.join(" ") });

    return { filter: filters.join(" "), backgroundImage: `url(${mainImg})` };
  }
  // To access Options
  const updateFilters = (index, val) => {
    let newOptions = [...options];
    newOptions[index]["value"] = val;
    setOptions([...newOptions]);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    // setSelThumbnail(file.name)
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:7000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        console.log("uploaded");
        res.json().then((data) => {
          console.log(data);
          setMainImg(data.url)

          sessionStorage.setItem("mainImg", data.url);
        });
      }
    });
  };

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-2">
          <div className='card'>
            <div className='card-body'>
              <input type="text" className="form-control" value={filterName} onChange={e => setFilterName(e.target.value)} />
              <button className='btn btn-primary' onClick={saveFilter}>Save Filter</button>
              {showToDoList()}
            </div>
          </div>
          {<Filters filterList={filterList} setOptions={setOptions} /> }
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card-body">
              <div className="loaded-image" style={getImageStyle()}></div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              {options.map(
                (opt, index) => (
                  <FilterSlider key={index} options={opt} updateFilterOptions={updateFilters} index={index} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageEditor;