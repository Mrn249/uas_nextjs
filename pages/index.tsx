import Link from "next/link"

export default function Home(){
  return(
    <div className="landing">
        <title>BEM STMIK Jayakarta</title>
        <div className="nav">
            <div className="logo">

                <a href="#">
                  <br/>
                    <p>BEM Jayakarta</p>
                </a>
            </div><br/>
            <ul>
                <li><Link href="https://www.jayakarta.ac.id" target="_blank">Web Jayakarta</Link></li>
                <li><Link href="/struktur">Struktur</Link></li>
                <li><Link href="/crud">List Anggota</Link></li>
            </ul>
        </div>
        <div className="header">
            
            <h2>BEM <span>STMIK Jayakarta</span></h2>
        </div>
        
        <div className="content-header">
            <p> BEM (Badan Eksekutif Mahasiswa) Kampus adalah sebuah organisasi mahasiswa yang bertanggung jawab dalam mengkoordinasikan dan menjalankan kegiatan-kegiatan kemahasiswaan di lingkungan kampus. BEM Kampus biasanya terdiri dari sekelompok mahasiswa yang terpilih secara demokratis atau melalui pemilihan umum untuk memegang jabatan dalam badan eksekutif tersebut. </p>
            
            
        </div>
        

        <div className="col-img">
        
        </div>

    </div>
  )
}