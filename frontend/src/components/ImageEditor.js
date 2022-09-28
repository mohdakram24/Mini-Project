import React, { useState } from 'react'
import DEFAULT_OPTIONS from './DefaultOptions';
import '../Editor.css';
import myimg2 from './Images/akramKhan.jpg'


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


const ImageEditor = () => {

  const [mainImg, setMainImg] = useState(myimg2);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);


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
        <div className="col-9">
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
                  <FilterSlider options={opt} updateFilterOptions={updateFilters} index={index} />
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