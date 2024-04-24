// <---START: `Hamburger Menu` Logic--->
const hamburger = document.querySelector('.hamburger')
const ul = document.querySelector('.header-container ul')
const iframe = document.querySelector('iframe')

hamburger.addEventListener('click', ()=> {
  ul.classList.toggle('ham_active')

  let ham_child = hamburger.firstElementChild
  if(ul.classList.contains('ham_active')) {
    ham_child.classList.replace('fa-bars', 'fa-xmark')
    // ham_child.src = "./xmark-solid.svg"; // Change the source to the xmark icon
  } else {
    ham_child.classList.replace('fa-xmark', 'fa-bars')
    // ham_child.src = "./bars-solid.svg"; // Change the source back to the bars icon
  }
})
// <---END: `Hamburger Menu` Logic--->

// <---START: `Light/Night Mode` Logic--->
const icon = document.querySelector('.fa-solid')

icon.addEventListener('click', ()=> {
  document.body.classList.toggle('dark-theme')
  if(document.body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun')
    iframe.style.filter = 'invert(100%)' //Dark mode activation in Google Map
  } else {
    icon.classList.replace('fa-sun', 'fa-moon')
    iframe.style.filter = 'invert(0%)'  //Light mode activation in Google Map
  }
})
// <---END: `Light/Night Mode` Logic--->

// <!--START: Logic for Basic Slider-->
const slider = document.querySelector('.slider')
const left = document.querySelector('.fa-angle-left')
const right = document.querySelector('.fa-angle-right')
const images = document.querySelectorAll('.images')
// console.log(images)

let slideNumber = 0

images.forEach((image, index) => {
  // console.log(`Setting position for image ${index + 1}`)
  image.style.left = `${index * 100}%`
})

const nextSlide = () => {
  slideNumber++
  slideImage()
} 

const prevSlide = () => {
  slideNumber--
  slideImage()
}

const getFirstSlide = () => {
  slideNumber = 0; // Set the slideNumber to the first image index
  slideImage(); // Update the displayed image
}

const getLastSlide = () => {
  slideNumber = images.length - 1; // Set the slideNumber to the last image index
  slideImage(); // Update the displayed image
}

const slideImage = () => {
  images.forEach((image) => {
    image.style.transform = `translateX(-${slideNumber * 100}%)`
  })
}

right.addEventListener('click', ()=>{
  console.log(`Right Arrow Clicked | Current 'slideNumber' is ${slideNumber}`)
  if(slideNumber < images.length - 1) {
    nextSlide() 
  } else {
    getFirstSlide()
  }
  updateButtonStyles()
})

left.addEventListener('click', ()=>{
  console.log(`Left Arrow Clicked | Current 'slideNumber' is ${slideNumber}`)
  if(slideNumber !== 0) {
    prevSlide() 
  } else {
    getLastSlide()
  }
  updateButtonStyles()
})
// <!--END: Logic for Basic Slider-->

// <!--START: Logic for Slider Dots-->
const bottom = document.querySelector('.bottom')

for(let i = 0; i < images.length; i++) {
  const div = document.createElement('div')
  div.className = 'button'
  bottom.appendChild(div)
}

const buttons = document.querySelectorAll('.button')

buttons[0].style.backgroundColor = '#ffffff'

buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    slideNumber = i; // Update slideNumber to match the button index
    slideImage(); // Update the slider position
    updateButtonStyles(); // Update button styles to indicate active slide
  });
});

const updateButtonStyles = () => {
  buttons.forEach((button, i) => {
    if (i === slideNumber) {
      button.style.backgroundColor = '#ffffff'; // Set active button style
    } else {
      button.style.backgroundColor = ''; // Reset other buttons' styles
      button.addEventListener('mouseover', stopSlideShow) // for auto sliding 
      button.addEventListener('mouseout', startSlideShow) // for auto sliding
    }
  });
}
// <!--END: Logic for Slider Dots-->

// <!--START: Logic for Auto Sliding-->
let slideInterval

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    if (slideNumber < images.length - 1) {
      nextSlide() 
    } else {
      getFirstSlide() 
    }
    updateButtonStyles()
  }, 2000)
}

const stopSlideShow = () => {
  clearInterval(slideInterval)
}

startSlideShow()

slider.addEventListener('mouseover', stopSlideShow)
slider.addEventListener('mouseout', startSlideShow)
right.addEventListener('mouseover', stopSlideShow)
right.addEventListener('mouseout', startSlideShow)
left.addEventListener('mouseover', stopSlideShow)
left.addEventListener('mouseout', startSlideShow)

// <!--END: Logic for Auto Sliding-->


// <---START: `Jobs Data Fetching` Logic--->
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to handle form submission
  document.getElementById('searchForm').addEventListener('submit', async function(event) {
      event.preventDefault();

      const searchInput = document.getElementById('searchInput').value.trim();
      if (!searchInput) return;

      const url = 'https://jobs-api14.p.rapidapi.com/list?query=' + encodeURIComponent(searchInput) + '&location=Japan&distance=1.0&language=ja&remoteOnly=false&datePosted=month&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor&index=0';
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '5fa6052638mshccab636a6bf1991p139232jsn54ffc2d42558',
              'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
          }
      };

      // Show spinner while data is being fetched
      const jobsContainer = document.getElementById('jobsContainer');
      jobsContainer.innerHTML = '<div class="spinner"></div>';

      try {
          const response = await fetch(url, options);
          const result = await response.json();
          console.log(result)
          displayJobs(result);
      } catch (error) {
          console.error(error);
      }
  });

  // Add event listeners to location buttons
  const locationButtons = document.querySelectorAll('.location-button');
  locationButtons.forEach(button => {
      button.addEventListener('click', async function() {
          // const location = button.innerHTML;
          const location = this.dataset.location;
          const url = `https://jobs-api14.p.rapidapi.com/list?query=%22%22&location=${encodeURIComponent(location)}&distance=1.0&language=ja&remoteOnly=false&datePosted=month&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor&index=0`;
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': '5fa6052638mshccab636a6bf1991p139232jsn54ffc2d42558',
                  'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
              }
          };

          // Show spinner while data is being fetched
          const jobsContainer2 = document.getElementById('jobsContainer2');
          jobsContainer2.innerHTML = '<div class="spinner"></div>';

          try {
              const response = await fetch(url, options);
              const result = await response.json();
              console.log(result)
              displayJobs2(result);
          } catch (error) {
              console.error(error);
          }
      });
  });
});

// Function to display filtered job listings [1]
const jobsContainer = document.getElementById('jobsContainer');
function displayJobs(jobs_data) {
  document.getElementById('searchInput').value = '';
  // const jobsContainer = document.getElementById('jobsContainer');
  jobsContainer.innerHTML = ''; // Clear previous job listings
  jobsContainer2.innerHTML = '';

  console.log(jobs_data); // Log the entire jobs array to check its structure and content

  if (jobs_data.jobs.length > 0) {
      jobs_data.jobs.forEach(job => {
          console.log(job); // Log each individual job object to check its properties

          // Truncate description to first 100 characters followed by three dots (...)
          const truncatedDescription = job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description;

          // Get the URL of the first job provider
          const jobProviderUrl = job.jobProviders && job.jobProviders.length > 0 ? job.jobProviders[0].url : '';

          const jobHTML = `
              <div class="job">
                  <img src="${job.image}" />
                  <a href="${jobProviderUrl}" target="_blank"><h3>${job.title}</h3></a>
                  <p><i>会社:</i> ${job.company}</p>
                  <p><i>投稿しました:</i> ${job.datePosted}</p>
                  <p><i>位置:</i> ${job.location}</p>
                  <p><i>タイプ:</i> ${job.employmentType}</p>
                  <!-- <p><i>説明:</i> ${truncatedDescription}</p> --> <!-- Display truncated description -->
              </div>
          `;
          jobsContainer.insertAdjacentHTML('beforeend', jobHTML);
      });
  } else {
      console.log('No jobs found or jobs array is empty.'); // Log a message indicating no jobs were found or array is empty
      jobsContainer.innerHTML = '<h2>No Jobs Found.</h2>';
  }
}

// Function to display filtered job listings [2]
const jobsContainer2 = document.getElementById('jobsContainer2');
function displayJobs2(jobs_data) {
  // const jobsContainer2 = document.getElementById('jobsContainer2');
  jobsContainer2.innerHTML = ''; // Clear previous job listings
  jobsContainer.innerHTML = ''; 

  console.log(jobs_data); // Log the entire jobs array to check its structure and content

  if (jobs_data.jobs.length > 0) {
      jobs_data.jobs.forEach(job => {
          console.log(job); // Log each individual job object to check its properties

          // Truncate description to first 100 characters followed by three dots (...)
          const truncatedDescription = job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description;

          // Get the URL of the first job provider
          const jobProviderUrl = job.jobProviders && job.jobProviders.length > 0 ? job.jobProviders[0].url : '';

          const jobHTML = `
              <div class="job">
                  <img src="${job.image}" />
                  <a href="${jobProviderUrl}" target="_blank"><h3>${job.title}</h3></a>
                  <p><i>会社:</i> ${job.company}</p>
                  <p><i>投稿しました:</i> ${job.datePosted}</p>
                  <p><i>位置:</i> ${job.location}</p>
                  <p><i>タイプ:</i> ${job.employmentType}</p>
                  <!-- <p><i>説明:</i> ${truncatedDescription}</p> --> <!-- Display truncated description -->
              </div>
          `;
          jobsContainer2.insertAdjacentHTML('beforeend', jobHTML);
      });
  } else {
      console.log('No jobs found or jobs array is empty.'); // Log a message indicating no jobs were found or array is empty
      jobsContainer2.innerHTML = '<h2>No Jobs Found.</h2>';
  }
}

// <---END: `Jobs Data Fetching` Logic--->

