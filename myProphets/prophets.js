
$('.pembuka').click(function(){
    $(this).fadeOut(1000,function(){
        $(this).hide()
    })
$(this).prev().css('marginLeft','100vw');
$(this).prev().prev().css('marginLeft','-50vw');
});
 
 
 
 
 for (let i = 0; i <=25; i++){
    
 $('option').eq(i).val($('option').eq(i).html());
 
    }


$('select').on('change',function(){
    let a = $(this).val().split(' A.S').join('');
    $('.isi').html(  `<div class="spinner-border loading d-flex justify-content-center mx-auto my-5" role="status">
    <span class="sr-only">Loading...</span>
    </div>
 `);
 proses(a)
});




function proses(n){
    fetch('https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q='+n.split(' S.A.W').join(''))
.then(hasil => hasil.json())
.then(hasil => {
    let nama = hasil.nabi.nama;
    let umur = hasil.nabi.umur;//SM logika or nabi isa & muhammad masehi
    let lahir =  hasil.nabi.lahir;
    let kisah = hasil.nabi.kisah;
    let gambar = hasil.nabi.image;
    let tempat = hasil.nabi.tempat;
           if(nama != 'Nabi Ishaq AS'){
        $('body').css({
            'backgroundImage':`url(${gambar})`,
            'backgroundRepeat':'no-repeat',
            'backgroundSize':'100vw 100vh',
            'backgroundAttachment':'fixed',
            'overflowX':'hidden',
            'overflowY':'auto',

        });
        
     }else{
        $('body').css({
            'backgroundImage':`url(../assests/ishaq.png)`,
            'backgroundRepeat':'no-repeat',
            'backgroundSize':'100vw 100vh',
            'backgroundAttachment':'fixed',
            'overflowX':'hidden',
            'overflowY':'auto',

        });
        
     }

   
   if (nama === 'Nabi Muhammad SAW' || nama === 'Nabi Isa AS') {
       $('.isi').html(`<h1 class="text-center">${nama}</h1>
       <p class="text-center font-weight-bold ">Umur : ${umur}  Lahir : ${lahir} M Tempat : ${tempat} </p>
       <p class="kisah">${kisah}</p>`)
   } else {
    $('.isi').html(`<h1 class="text-center">${nama.split('(Part 1)').join('')}</h1>
    <p class="text-center font-weight-bold ">Umur : ${umur}  Lahir : ${lahir} SM Tempat : ${tempat} </p>
    <p class="kisah">${kisah}</p>`)
   }
}).catch(()=> {

   $('body').css({
    'backgroundImage':`url(../assests/bgprophet.jpg)`,
    'backgroundRepeat':'no-repeat',
    'backgroundSize':'100vw 100vh',
    'backgroundAttachment':'fixed',
    'overflowX':'hidden',
    'overflowY':'auto',

   });
    $('.isi').html(' ')
})


}
