# TaskFlow — Smart Daily Planner 🚀

**TaskFlow** adalah aplikasi web daily planner yang menggabungkan manajemen tugas dengan gamifikasi untuk membantu pengguna menjadi lebih konsisten, fokus, dan termotivasi.

---

## Daftar Isi

1. [Latar Belakang](#latar-belakang)
2. [Motivasi & Tujuan](#motivasi--tujuan)
3. [Manfaat Utama](#manfaat-utama)
4. [Fitur Unggulan](#fitur-unggulan)
5. [Cara Menggunakan](#cara-menggunakan)

   * Instalasi & Menjalankan Aplikasi
   * Cara Menggunakan Fitur Utama
6. [Tips & Best Practices](#tips--best-practices)
7. [Contoh Workflow Harian](#contoh-workflow-harian)
8. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
9. [Lisensi & Kontak](#lisensi--kontak)

---

## Latar Belakang

**Masalah yang diselesaikan:**

* Sulit merencanakan dan melacak tugas harian.
* Kurangnya motivasi untuk menyelesaikan tugas.
* Tidak adanya sistem reward untuk mempertahankan konsistensi.
* Antarmuka to-do list konvensional terasa membosankan.

**Konteks pengembangan:**
TaskFlow dirancang sebagai solusi modern yang memadukan gamifikasi dan manajemen tugas dengan estetika glassmorphism, animasi halus, dan sistem pencapaian untuk menciptakan pengalaman yang engaging.

## Motivasi & Tujuan

**Motivasi:** Membuat aplikasi yang fungsional sekaligus memberikan kepuasan visual dan psikologis.

**Tujuan:** Meningkatkan konsistensi pengguna dalam menyelesaikan tugas melalui fitur streak dan achievement.

**Visi:** Menjadi daily companion yang membantu pengguna mencapai tujuan secara terstruktur dan menyenangkan.

## Manfaat Utama

* **Visual Progress Tracking:** Monitor progres harian secara real-time dengan visual menarik.
* **Priority Management:** Atur tugas berdasarkan prioritas (Rendah / Sedang / Tinggi).
* **Streak Motivation:** Sistem streak untuk mendorong kebiasaan harian.
* **Achievement System:** Gamifikasi dengan unlockable achievements & confetti celebration.
* **Dark/Light Mode:** Nyaman digunakan di kondisi pencahayaan berbeda.
* **Responsive Design:** Bisa diakses di desktop maupun mobile.

## Fitur Unggulan

**Smart Task Management**

* Tambah, edit, hapus tugas dengan mudah.
* Setel waktu dan prioritas untuk setiap tugas.
* Filter & sortir tugas berdasarkan berbagai kriteria.

**Progress Visualization**

* Progress ring dengan animasi smooth.
* Statistik harian yang informatif.
* Visual feedback memuaskan saat tugas selesai.

**Motivational Elements**

* Quote motivasi harian.
* Achievement unlocks dengan efek confetti.
* Streak counter yang memantau konsistensi.

**User Experience**

* Glassmorphism design modern.
* Transisi & animasi halus.
* Keyboard shortcuts untuk power users.

## Cara Menggunakan

### Instalasi & Menjalankan Aplikasi

Aplikasi ini berjalan langsung di browser — tanpa instalasi server tambahan.

1. **Download file**

   * `index.html`
   * `style.css`
   * `script.js`

2. **Simpan** ketiga file tersebut ke dalam satu folder.

```
taskflow-folder/
├── index.html
├── style.css
└── script.js
```

3. **Jalankan**

   * Buka `index.html` menggunakan browser favorit (Chrome, Firefox, Edge, Safari).
   * Aplikasi akan langsung berjalan dan menyimpan data ke Local Storage.

### Cara Menggunakan — Fitur Utama

#### 1. Menambahkan Tugas Baru

**Contoh Input:**

* **Nama Kegiatan:** `Meeting dengan tim marketing`
* **Waktu:** `14:30` (opsional)
* **Prioritas:** `Tinggi`

**Langkah:**

1. Isi field *Nama Kegiatan*.
2. Pilih waktu (opsional).
3. Tentukan prioritas (Rendah / Sedang / Tinggi).
4. Klik **Tambah Tugas**.

**Output:** tugas muncul di daftar dengan badge prioritas, statistik "Pending" bertambah.

#### 2. Mengelola Tugas yang Ada

* Centang checkbox untuk menandai tugas selesai (akan menambah statistik "Selesai" dan memperbarui progress ring).
* Klik ikon edit untuk mengubah detail tugas.
* Klik ikon hapus untuk menghapus tugas.

#### 3. Filter & Sortir

* **Filter:** Semua / Aktif / Selesai / Berdasarkan Prioritas.
* **Sortir:** Terbaru / Waktu / Prioritas / Nama.

#### 4. Melihat Pencapaian

* Klik ikon trophy di header atau navigasi mobile.
* Lihat achievement yang sudah/ belum terkunci.
* Setiap unlock akan memicu confetti celebration.

## Tips & Best Practices

**Shortcut Keyboard**

* `Ctrl + K` / `Cmd + K`: Fokus ke input nama tugas.
* `Escape`: Tutup modal yang terbuka.

**Best Practices**

* Gunakan prioritas dengan bijak:

  * **Tinggi:** Urgent & penting.
  * **Sedang:** Penting tapi tidak urgent.
  * **Rendah:** Opsional / backlog.
* Setel waktu untuk tugas yang time-sensitive agar tidak terlewat (akan ditandai sebagai overdue jika lewat).
* Jaga streak: usahakan menyelesaikan minimal 1 tugas setiap hari untuk mempertahankan streak.

## Contoh Workflow Harian

**Morning Routine**

* `08:00` — [Tinggi] Review daily goals
* `08:30` — [Sedang] Check & reply email
* `10:00` — [Tinggi] Kerjakan project utama

**Afternoon Session**

* `13:00` — [Sedang] Meeting tim
* `15:00` — [Rendah] Organize documents
* `16:30` — [Tinggi] Finalize laporan

## Teknologi yang Digunakan

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** Tailwind CSS + custom glassmorphism
* **Icons:** Font Awesome 6
* **Storage:** Local Storage API
* **Effects:** Canvas Confetti
* **Font:** Inter (Google Fonts)

## Lisensi & Kontak

* **Lisensi:** (Tambahkan lisensi proyek Anda di sini — mis. MIT)
* **Kontak & Kontribusi:** Untuk kontribusi, ide fitur, atau laporan bug, silakan buka issue atau kirim PR pada repository proyek.

---

**TaskFlow — Your Smart Daily Companion**
Transform your productivity with beautiful design and smart features.
