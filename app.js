const key="128256084f084a9fa46204104231810";
const url=`http://api.weatherapi.com/v1/current.json?key=${key}&q=`;

const pexelKey='G6xi8X9mtUtzkqOqDq0ugbSXdlV4YuLS3ASocmGRh7N1JobTr0k6VJHR';

async function updateVideo(value){
   try{
        let response=await fetch(`https://api.pexels.com/videos/search?query=${value}&orientation=landscape&size=medium&per_page=`,{
            headers:{
                authorization:'G6xi8X9mtUtzkqOqDq0ugbSXdlV4YuLS3ASocmGRh7N1JobTr0k6VJHR'
            }
        })
        let data=await response.json();
        let video=document.getElementById('video');
        let source=document.getElementById('trying-src');
        let srcvalue = data.videos[2].video_files;
        srcvalue.forEach(video => {
            if(video.quality==='hd'){
                source.src=video.link;
                return true;
            }
        });
        
        video.load();
   }catch(error)
   {
    console.log(error);
   }
    

}

let searchBtn=document.getElementById('search-btn');
let input=document.getElementById('input');
searchBtn.addEventListener('click',()=>{
    let inputVal=input.value;
    getweatherCondition(inputVal);
})
input.addEventListener('keyup',(event)=>{
    if(event.keyCode===13){

        event.preventDefault();
        searchBtn.click();
    }
})

async function getweatherCondition(input){
    try{
        let response=await fetch(url+input);
        let data=await response.json();
        setWeatherCondition(data);
    }catch(error){
        console.log(error);
    }
}
function setWeatherCondition(data){
    let tempInC=document.getElementById('temp-in-c');
    let humidity=document.getElementById('humidity');
    let cloud=document.getElementById('cloud');
    let windDir=document.getElementById('wind-dir');
    let weatherCond=document.getElementById('weather-cond');
    let tempInF=document.getElementById('temp-in-f');
    
    let weather=data.current.condition.text;
    weatherCond.innerText=data.current.condition.text;
    cloud.innerText=data.current.cloud;
    humidity.innerText=data.current.humidity;
    windDir.innerText=data.current.wind_dir;
    tempInC.innerText=`${data.current.temp_c} °C`
    tempInF.innerText=`${data.current.temp_f} F`
    updateVideo(`${weather} weather`);
}
