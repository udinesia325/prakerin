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
fetch(url).then(hasil => hasil.json()).finally(()=>lambangloading()).then(r =>proses(r) ).catch((e)=>gagal());
function proses(hasil){
    if (hasil.result[0] ==undefined) {
        throw new Error
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
// function gagal() {
//     let kartu = `	<h3 class="text-center text-white my-5">Tidak ada hasil ...</h3>
//                 <p class="text-center text-white">Server sedang dalam maintenance</p>
//     `
//     $('#tombol').html('');
//     $('#tombol').removeClass('jarak-loading');
//     $('#tombol').addClass('fa fa-search')
//     $('.hasil').show();
//     $('.hasil').html(kartu);
//     $('.hasil').nextUntil($('.gajelas')).hide();
//     window.scrollTo(0,500)

// }
