import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link"
import Image from "next/image";
import { stat } from "fs";

 const koneksiAnggota = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/anggota" 
});

export default function FormAnggota() {
    const [statenama, setNama] = useState("");
    const [statenim, setNim] = useState("");
    const [stateno_hp, setNo_hp] = useState("");
    const [statealamat, setAlamat] = useState("");
    const [statetanggal, setTanggal] = useState("2018-07-22");
    const [statestatus, setStatus] = useState("");
    const [statefoto, setFoto] = useState("");
    const [anggota, setAnggota] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
  
  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiAnggota
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
 }
 const handleSubmitEdit = (event) => {
  event.preventDefault();
  const address = "/"+event.target.nim.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nim: event.target.nim.value,
    nama: event.target.nama.value,
    no_hp: event.target.no_hp.value,
    alamat: event.target.alamat.value,
    tanggal_gabung: event.target.tanggal_gabung.value,
    status: event.target.status.value

}
  alert(formData);
  koneksiAnggota
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
    setAdd("show");
    setbtnAdd("hide");
    setEdit("hide");    
}
  const handleCancelAdd = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNim("");
    setNo_hp("");
    setAlamat("");
    setTanggal(formatDate("2018-07-22"));
    setStatus("");
    setFoto("");
     
 }
  const handleDelete = (event) => {
    event.preventDefault();
    var nim = event.target.value;
    if(nim){}
      koneksiAnggota.delete(`/${nim}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
            setAnggota(
            anggota.filter((anggota) => {
            return anggota.nim !== nim;
            }))
             
  // Lakukan langkah-langkah lain setelah penghapusan data
            })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
            })
          }

  const handleEdit = (event) => {
    event.preventDefault();
    var nim = event.target.value;
      const agtEdit = anggota.filter((anggota) => {
        return anggota.nim == nim;
        });
          if(agtEdit!=null){
            setNama(agtEdit[0].nama);
            setNim(agtEdit[0].nim);
            setNo_hp(agtEdit[0].no_hp);
            setAlamat(agtEdit[0].alamat);
            setTanggal(formatDate(agtEdit[0].tanggal_gabung));
            setStatus(agtEdit[0].status);
            setFoto(agtEdit[0].foto);
            setAdd("hide");
            setbtnAdd("hide");
            setEdit("show");
          }
        }
          
  useEffect(() => {
      async function getAnggota() {
        const response = await koneksiAnggota.get("/").then(function (axiosResponse) {
          setAnggota(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from anggota in api anggota: '+error);
         });
          }
      getAnggota();
    }, []);
  
   
if(anggota==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    
   <center>    
    <div className="crud">
    <Link href="/"><button className="button-down">&laquo; Back</button></Link>
    <head>
      <title>List Data Anggota BEM</title>
    </head><br/><br/><br/>
    <h1 style={{color: "white"}}>BADAN EKSEKUTIF MAHASISWA/I STMIK JAYAKARTA</h1><br/><br/>
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}>
       <br/><br/><h2>TAMBAH DATA ANGGOTA</h2><br/>
        <table>
        <tbody>
        <tr>
            <td><label> Nim:</label></td>
            <td><input type="text" id="nim" name="nim" placeholder="Masukan Nim"/></td>
        </tr>
        <tr>
            <td><label> Nama:</label></td>
            <td><input type="text" id="nama" name="nama" placeholder="Masukan Nama"/></td>
        </tr>
        <tr>
            <td><label> Foto:</label></td>
            <td><input type="file" id="foto" name="image"/></td> 
        </tr>
        <tr>
            <td><label> No Handphone:</label></td>
            <td><input type="text" id="no_hp" name="no_hp" placeholder="Masukan No Handphone"/>  </td>
        </tr>
        <tr>
            <td><label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" placeholder="Masukan Alamat"></textarea></td>
        </tr>
        <tr>
            <td><label> Tanggal Gabung:</label></td>
            <td><input type="date" name="tanggal_gabung"
           min="1970-01-01" max="2025-12-31"/></td>
        </tr>
        <tr>
            <td><label> Status:</label></td>
            <td><input type="text" id="status" name="status" placeholder="Masukan Status"/></td>
        </tr>
            </tbody>
          </table><br></br>
          <input type="submit"/> | <input type="button" value="Cancel" onClick={handleCancelAdd} /><br/><br/><br/>
          </form>  

      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
      <br/><br/><h2>UBAH DATA ANGGOTA</h2><br></br>
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nim:</label></td>
            <td><input type="text" id="nim"  value={statenim} name="nim"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama" value={statenama} name="nama" placeholder="Ubah Nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/></td>
        </tr>
        <tr>
            <td>  <label> No Handphone:</label></td>
            <td>  <input type="text" id="no_hp" value={stateno_hp} name="no_hp" placeholder="Ubah No Handphone" onChange={(e) => setNo_hp(e.target.value)}/></td>
        </tr>
        <tr>
            <td>  <label> Tanggal Gabung:</label></td>
            <td>  <input type="date" value={statetanggal} name="tanggal_gabung" onChange={(e) => setTanggal(e.target.value)}
           min="1970-01-01" max="2025-12-31"/></td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat" placeholder="Ubah Alamat" onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
        <tr>
            <td>  <label> Status:</label></td>
            <td>  <input type="text" id="status" value={statestatus} name="status" placeholder="Ubah Status" onChange={(e) => setStatus(e.target.value)}/></td>
        </tr>
            </tbody>
          </table><br/>
          <input type="submit" /> | <input type="button" value="Cancel" onClick={handleCancelEdit} /><br/><br/><br/>
          </form>  
          <br></br>
        <button id="btnadd" onClick={handleAdd} className={statebutonadd}
        style={{
          cursor: "pointer",
          color: "white",
          background: "#48c246",
          border: "1px solid #48c246",
          padding: "8px 15px",
          fontWeight: "bold",
          borderRadius: "3px",
          transition: "0.3px ease-in-out"}}>Tambah Data</button><br/>
        <br></br><br></br>
        <h4 style={{color: "white"}}>Tabel Data Anggota BEM hasil get Local Nodejs</h4>
        <table className="hias">
            <thead>
                <tr>
                <th>Nim</th> 
                <th>Nama</th>
                <th>Foto</th>
                <th>No Handphone</th>
                <th>Alamat</th>
                <th>Tanggal Gabung</th>
                <th>Status</th>
                <th colSpan={2}><center>Opsi</center></th>
                </tr>
            </thead>
            <tbody>
            {anggota.map((agt) => 
                <tr className="p2">
                    <td>{agt.nim}</td>
                    <td>{agt.nama}</td>
                    <td><img src={agt.foto} width="70" className="foto" /></td>
                    <td>{agt.no_hp}</td>
                    <td>{agt.alamat}</td>
                    <td>{agt.tanggal_gabung}</td>
                    <td>{agt.status}</td>
                   <td><button style={{borderColor: "orange", cursor: "pointer"}} onClick={handleEdit} value={agt.nim}>Ubah</button> | <button style={{borderColor: "red", cursor: "pointer"}} onClick={handleDelete} value={agt.nim}>Hapus</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
          <br></br>
          <br></br><br></br>
          </div></center>
        )
}
  
  }