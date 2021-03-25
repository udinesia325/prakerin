$(".pencari").click(function(e){

  let isi = document.querySelector('.masukan').value;
  if( isi.textContent == ''){
    Swal.fire(
      'Terjadi kesalahan?',
      'Jangan kosong',
      'error'
    )
  }
   semuaproses()
})


//ilang tutup
$('.tutup').hide();
//animasi
$('.masukan').keypress(function (e) { 
  if(e.keyCode == 13){
    $('.pencari').click()
  }
  let r = Math.round(Math.random()*55)
  let g = Math.round(Math.random()*55)
  let b = Math.round(Math.random()*55)
  $('.tutup').show();
  $(this).css('background',`rgb(${200+r},${200+g},${200+b})`)
});
$('.tutup').click(function () { 
  $('.masukan').val('').css('background','white')
  
});

function semuaproses(){
  //ini loading
  $('.isi-film').html(` <div class="spinner-grow spinner-grow-sm text-primary d-flex justify-content-center mx-auto my-5" style="width: 3rem; height: 3rem;" role="status">
</div>`)
  var masukan =document.querySelector(".masukan").value;
  //email key cadangan 2d2d6236
  fetch("https://www.omdbapi.com/?apikey=b053a650&s="+masukan)
  .then(response => response.json())
  .then(hasil => {
    if (hasil.Response === 'False') {
      $('.isi-film').html(' ')
      Swal.fire(
        'Ooops!',
        'Film yang kamu cari tidak ada',
        'error'
      )  
    } else {
        let film= hasil.Search;
        let kartu = "";
        film.forEach(h =>{
        kartu += `<div class="col col-sm-5 col-md-3 col-lg-3 m-2 ">
                  <div class="card faris">
          <img src="${h.Poster}" class="card-img-top content">
          <div class="card-body">
          <h5 class="card-title">${h.Title}</h5>
            <span>${h.Year}</span>
            <a href="#" class="btn btn-dark text-white info"data-toggle="modal" data-target="#info"data-id="${h.imdbID}">Info Detail</a>
                </div>
            </div>
          </div>`
        
    }
    )


    
       $(".isi-film").html(kartu);
      $(".info").click(function(){
          let id = $(this).data("id");
        fetch("https://www.omdbapi.com/?apikey=b053a650&i="+id) //api key yang lain 2d2d6236 || 
        .then(response => response.json())
        .then(r=>{
          $(".modal-body").html(`<div class="row">
    <div class="col col-4">
      <img src="${r.Poster}" class="img-fluid" />
    </div>
    
    <div class="col col-7">
      <ul class="list-group">
        <li class="list-group-item"><h3>Judul :</h3>${r.Title}</li>
        <li class="list-group-item">Tahun Rilis :${r.Year} </li>
        <li class="list-group-item">Durasi : ${r.Runtime}</li>
        <li class="list-group-item">Genre : ${r.Genre}</li>
        <li class="list-group-item">Director : ${r.Director}</li> 
        <li class="list-group-item">Penulis : ${r.Writer}</li>
        <li class="list-group-item">Aktor : ${r.Actors}</li>
        <li class="list-group-item">Plot : ${r.Plot}</li>
        <li class="list-group-item">Bahasa : ${r.Language}</li>
      </ul>
    </div>
              </div>`
            )
            });
      })
      


    }
    $('.spinner-grow').hide()
  }).finally(()=> $('.spinner').hide())
}
$('.masukan').blur(function (){
  $(this).css('background','black')
})
