'use strict';
$('.logo').click(()=>document.location.href = 'myfilm2.html')
$(document).ready( function () {
   rekomendasi()
    segera()
    terbaru()
});

let i =0;
setInterval(()=>{
    i++
    if(i ==1){    
            yowisben()
    }else if(i==2){
        ambyar()

    }else if (i==3){
        dilan()
        i -=4

    }
  
},20000)

function yowisben() {
  $('.banner').html(`<img src="../assests/yowisben1.png" class="bg">
  <div class="content">
      <img src="../assests/wmyowisben.png" class="movieTitle">
      <h5>
          2019 | <i>13+</i> | 109 min | Comedy, Drama
      </h5>
      <p>Popularitas Yowis Ben di Malang tidak menyelesaikan masalah keuangan Bayu. Anggota lain juga punya masalah sendiri. Kemudian mereka dikenalkan dengan Cak Jim yang mengaku bisa membesarkan mereka menjadi artis nasional.</p>
        <div class="buttons">
            <a href="https://youtu.be/mkHCkYvgRVo" target="_blank"><i class="fab fa-youtube"></i>Trailer</a>
            <a href="https://lk21online.xyz/yowis-ben-2-2019/" target="_blank"><i class="fas fa-play"></i>Tonton</a>
        </div>
</div>`);
}


function ambyar() {
    $('.banner').html(`<img src="../assests/bannerambyar1.png" class="bg">
    <div class="content">
        <img src="../assests/wmambyar.png" class="movieTitle">
        <h5>
            2020 | <i>13+</i> | 101min | Drama, Komedi
        </h5>
        <p>mengisahkan perjalanan cinta seorang pemilik kedai kopi bernama Jatmiko (Bhisma Mulia) yang bertemu dengan Saras (Denira Wiguna). Jatmiko jatuh cinta untuk pertama kalinya. Namun, dia juga pertama kalinya merasakan patah hati mendalam hingga hidupnya berantakan.</p>
        <div class="buttons">
				<a href="https://youtu.be/3bCWr6dJgEM" target="_blank"><i class="fab fa-youtube"></i>Trailer</a>
				<a href="https://lk21online.xyz/nonton-sobat-ambyar-2021-subtitle-indonesia/" target="_blank"><i class="fas fa-play"></i>Tonton</a>
		</div>
    </div>`);
}
function dilan() {
$('.banner').html(`<img src="../assests/dilan2.png" class="bg">
<div class="content">
    <img src="../assests/wmmilea.png" class="movieTitle">
    <h5>
        2019 | <i>16+</i> | 121min | Drama, Romance
    </h5>
    <p>Keputusan berpisah dengan Dilan dibuat Milea sebagai peringatan agar Dilan menjauh dari geng motor. Namun perpisahan yang tadinya hanya gertakan bagi Milea menjadi perpisahan yang bertahan hingga mereka lulus kuliah dan beranjak dewasa.</p>
    <div class="buttons">
        <a href="https://youtu.be/Z4OlM_hitnU" target="_blank"><i class="fab fa-youtube"></i>Trailer</a>
        <a href="https://lk21online.xyz/milea-2020/" target="_blank"><i class="fas fa-play"></i>Tonton</a>
	</div>
</div>`);
}

function rekomendasi() {
    const urlfilm = 'http://api-lk21.herokuapp.com/country?country=indonesia';
    fetch(urlfilm).then(h => h.json()).then(h => render('.rekomendasi',h)).catch((e)=>gagal())

}
        
function segera() {
    const urlfilm = 'http://api-lk21.herokuapp.com/comingsoon';
    fetch(urlfilm).then(h => h.json()).then(h => render('.segera',h)).catch((e)=>gagal())

}
        

function terbaru() {
    const urlfilm = 'http://api-lk21.herokuapp.com/newupload';
    fetch(urlfilm).then(h => h.json()).then(h => render('.terbaru',h)).catch((e)=>gagal())

}
        

//menampilkan ke html
const render = (posisi,data)=>{
    
    let kartu = '';
    data.result.forEach((h,i) =>{
        let judul = h.title.split('');
        let batasKata = judul.splice(20,30,'...');
        let gambar = h.thumbnail;
        let genre = h.genre;
        let rating = h.rating;
        let durasi = h.duration;
        let kualitas = h.quality;
        let film = h.watch;
        let cuplikan = h.trailer;
        if(cuplikan != undefined){
            let pecah =cuplikan.split('watch?v=');
            let selip = pecah.splice(1,0,'embed/');
            kartu +=`<div class="card bg-transparent text-center">
                <img src="${gambar}" class="card-img-top" alt="...">
                <div class="card-body">
                <small class="text-white">${judul.join('')}</small><br>
                <button class="btn btn-primary btn-sm  mt-1 lihat" data-cuplikan="${pecah.join('')}" data-film="${film}" data-genre="${genre.join(' / ')}" data-kualitas="${kualitas}" data-durasi="${durasi}"  data-rating="${rating}">Lihat</button>
                </div>
            </div>`
        
        }
        
    
    }) 
    $(posisi).html(kartu);
}
//event binding
$(document).click( function (e) { 
    if (e.target.classList.contains('lihat')) {
        const cuplikan = e.target.dataset.cuplikan;
        const film =e.target.dataset.film;
        const genre =e.target.dataset.genre;
        const durasi =e.target.dataset.durasi;
        const rating =e.target.dataset.rating;
        const kualitas =e.target.dataset.kualitas;
        Swal.fire({
            html:
            `	<iframe src="${cuplikan}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         <br> <small>${genre}${rating + '<i class="fas fa-star"></i>'} ${kualitas}${durasi}</small> <br>
          <a href="${film}" target="_blank" class="btn btn-dark"><i class="fas fa-eye"></i>  Tonton</a>
    `,
        confirmButtonText:`tutup`
        })
    }    
    });
    
$('.hasil').hide();
$('#tombol').click(function () { 
    const load = `<div class="spinner-border spinner-border-sm text-white" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
  //tambahin loading ketika di klik
      $(this).html(load);
    $(this).removeClass('fa fa-search');
    $(this).addClass('jarak-loading')
    let masukan = $(this).prev().val();
    lakukan(masukan);

});
$('#masukan').keypress(function (e) { 
    if(e.keyCode==13){
        $('#masukan').next().click()
    }
});

function lakukan(l) {
    
const url = `http:api-lk21.herokuapp.com/search?query=${l}`;
fetch(url).then(hasil => hasil.json()).finally(()=>lambangloading()).then(r =>proses(r) );
function proses(hasil){
    if (hasil.result.length === 0) {
        gagal()
        return;
    }
    let kartu = '';
    hasil.result.forEach((h,i) =>{
        let judul = h.title.split('');
        let batasKata = judul.splice(20,30,'...');
        let gambar = h.thumbnail;
        let genre = h.genre;
        let rating = h.rating;
        let durasi = h.duration;
        let kualitas = h.quality;
        let film = h.watch;
        let cuplikan = h.trailer;
        if(cuplikan != undefined){
            let pecah =cuplikan.split('watch?v=');
            let selip = pecah.splice(1,0,'embed/');
            kartu +=`<div class="card bg-transparent text-center">
                <img src="${gambar}" class="card-img-top" alt="...">
                <div class="card-body">
                <small class="text-white">${judul.join('')}</small><br>
                <button class="btn btn-primary btn-sm  mt-1 lihat" data-cuplikan="${pecah.join('')}" data-film="${film}" data-genre="${genre.join(' / ')}" data-kualitas="${kualitas}" data-durasi="${durasi}"  data-rating="${rating}">Lihat</button>
                </div>
            </div>`
        
        }
        
    
    }) 
    $('.hasil').show();
    $('.hasil').html(kartu);
    $('.hasil').nextUntil($('.gajelas')).hide();
    window.scrollTo(0,500)


}

}

function lambangloading() {
    $('#tombol').html('');
    $('#tombol').removeClass('jarak-loading');
    $('#tombol').addClass('fa fa-search')
}
function gagal() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Film Yang anda cari tidak dapat di temukan',
      })

}
