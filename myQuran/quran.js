
$('#pencari').keypress(function (e) { 
    $('.tombol').click();
});

$('.tombol').click(function () { 
$('.keterangan').html(`<div class="spinner-border text-center mx-auto text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`)
setInterval(()=>{
    $('.spinner-border').toggleClass('text-primary')
    $('.spinner-border').toggleClass('text-success')

},1000)
});
$('.tombol').click(function (){
    let angka = $('#pencari').val()
    if (angka>=1 && angka<=114) {
        fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${angka}.json`)
        .then(hasil => hasil.json())
        .finally(()=>{$('.spinner-border').hide()})
        .then(h => {
            let namaSurat = h.name;
            let arti = h.name_translations;
            let jumlahAyat = h.number_of_ayah;
            let suratKe = h.number_of_surah;
            let diTurunkanDi = h.type;
            let mishary = h.recitations[0].audio_url;
            let sudais = h.recitations[1].audio_url;
            let ghamidi = h.recitations[2].audio_url;
            let perayat='';
            let perarti = '';
            if (suratKe == 1 || suratKe == 27){
                let ayat = h.verses.forEach(a => {           
                    perayat += a.text + ' '+ a.number + '<br><hr><br>';
            });
            }else{
                let ayat = h.verses.forEach(a => {           
                    perayat += a.text.split('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ') + ' '+ a.number + '<br><hr><br>';
            });
            }
            
           
            let terjemahan = h.verses.forEach(a => {
                perarti += a.number  + ' '+a.translation_id  + '<br><hr><br>';
            })
            $('.qori').html(` <div class="col col-3 mx-auto">
            <a href="${sudais}"  class="btn btn-dark download"> DOWNLOAD Audio</a>
         </div>
         <div class="col col-3 mx-auto">
             <a href="${ghamidi}"  class="btn btn-dark download"> DOWNLOAD Audio</a>
          </div>
          <div class="col col-3 mx-auto">
             <a href="${mishary}"  class="btn btn-dark download"> DOWNLOAD Audio</a>
          </div>`)

            $('.keterangan').html(` <div class="col col-7   mx-auto">
            <h1 class="text-center font-weight-bold text-success">${namaSurat}</h1>
        </div>
        <div class="col col-7  mx-auto text-center font-weight-bold ket-text">
            <p>${arti.ar}  /  ${arti.id}  /  ${arti.en}  surat ke : ${suratKe} jumlah ayat : ${jumlahAyat} Golongan ${diTurunkanDi}</p>
            <!-- ganti mode -->
<label class="switch ">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
<h5 class="mt-2 mb-2">Ganti mode</h5>
<h2 class="mt-2">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>

            
        </div>
        <!-- ayat -->
        <div class="col col-6 text-center terjemahan">
        <p></p>
        <input class="mb-3 ayat" type="range" min="12" max="30" >
            <p class="perayat">${perayat}</p>
        
        </div>
        <!-- terjemahan -->
        <div class="col col-6 text-center lafal">
        <p></p>
        <input class="mb-3 arti" type="range" min="12" max="30" >

            <p>${perarti}</p>
        
        </div>`)       
        $('.ayat').on('input',function(){
            let a = $(this).val();
            $(this).prev().html(a+'px')
            $('.terjemahan').css('fontSize',a+'px');
        });
        $('.arti').on('input',function(){
            let a = $(this).val()
            $(this).prev().html(a+'px')

            $('.lafal').css('fontSize',a+'px')
        });
        $('.round').click(function () {    
            $('body').toggleClass('malam');
             
         });
        
});

    } else {
        $('.spinner-border').hide();

        Swal.fire(
            'ooops',
            'Cari angka antara 1 - 114',
            'error'
          )
    }
   
});
