# MCP Notion Guide

Panduan lengkap untuk mengonfigurasi dan menggunakan **Model Context Protocol (MCP) Notion** di environment AI, seperti Cursor. Integrasi ini dapat digunakan untuk otomatisasi manajemen database Notion, sinkronisasi tools, serta pencatatan *book summary*.

---

## 1. Setup Integrasi dan Database ID Notion

Sebelum menghubungkan AI ke Notion, siapkan terlebih dahulu database Notion sebagai tempat penyimpanan data.

### 1.1 Buat Integrasi di Notion

1. Buka halaman [Notion Integrations](https://www.notion.so/my-integrations).
2. Klik **New integration**.
3. Isi nama integrasi, misalnya:
  ```text
   AI MCP Assistant
  ```
4. Pilih workspace Notion yang akan digunakan.
5. Aktifkan capability/izin berikut:
  - **Read content**
  - **Update content**
  - **Insert content**
6. Salin **Internal Integration Secret** dengan format seperti berikut:
  ```text
   secret_xxxxxxxxxxxxxxxxxxxxxxxxx
  ```

> Jangan membagikan `NOTION_API_KEY` atau Internal Integration Secret ke repository publik, screenshot, atau chat publik.



### 1.2 Hubungkan Database ke Integrasi

1. Buat halaman database baru di Notion, misalnya:
  - Database **Bookmark Tools**
  - Database **Book Summary**
2. Buka database tersebut.
3. Klik ikon **...** di pojok kanan atas.
4. Pilih **Add connections**.
5. Cari dan pilih integrasi yang baru dibuat, misalnya **AI MCP Assistant**.



### 1.3 Ambil Database ID

1. Buka database Notion dari browser.
2. Salin URL database tersebut.

Contoh format URL:

```text
[https://www.notion.so/namaworkspace/NAMA-DATABASE-DATABASE_ID?v=xxxxxxxxxxxxxxxx](https://www.notion.so/namaworkspace/NAMA-DATABASE-DATABASE_ID?v=xxxxxxxxxxxxxxxx)
```

1. Ambil string ID database yang berada setelah `/` terakhir dan sebelum `?v=`.

Contoh:

```text
[https://www.notion.so/workspace/Bookmark-Tools-1234567890abcdef1234567890abcdef?v=xxxx](https://www.notion.so/workspace/Bookmark-Tools-1234567890abcdef1234567890abcdef?v=xxxx)
```

Database ID:

```text
1234567890abcdef1234567890abcdef
```

> Pada beberapa URL Notion, ID dapat tampil dengan tanda hubung. Gunakan format ID yang diterima oleh API atau MCP Anda, umumnya 32 karakter tanpa tanda hubung.

---



## 2. Konfigurasi MCP Notion di Cursor

Agar Cursor dapat mengakses Notion melalui MCP, daftarkan server MCP Notion ke konfigurasi MCP.

Lokasi konfigurasi dapat berupa:

- File `mcp.json`
- Cursor Settings → **Features** → **MCP**
- Konfigurasi MCP pada level global atau workspace



### Contoh Konfigurasi MCP Notion

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-notion"
      ],
      "env": {
        "NOTION_API_KEY": "secret_xxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```



### Catatan Keamanan

Sebaiknya simpan API key melalui environment variable atau konfigurasi lokal yang tidak di-*commit* ke Git.

Contoh file `.gitignore`:

```gitignore
.env
.env.local
mcp.json
```

Jika konfigurasi Anda mendukung pemuatan environment variable dari file `.env`, gunakan format berikut:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxx
```

---



## 3. Buat File `AGENTS.md`

Buat file bernama `AGENTS.md` di root directory proyek. File ini berfungsi sebagai panduan bagi AI Agent dalam membaca struktur database dan memetakan data sebelum dikirim ke Notion.

```markdown
# AGENTS.md - Notion MCP Automation Agent

## Scope dan Configuration

- **Target Platform:** Notion via MCP
- **Bookmark Tools Database ID:** `YOUR_BOOKMARK_TOOLS_DATABASE_ID`
- **Book Summary Database ID:** `YOUR_BOOK_SUMMARY_DATABASE_ID`

***

## Database Mapping Rules

### 1. Bookmark / Tools Database

Database ini digunakan untuk menyimpan review tools, website, software, API, atau layanan IT.

| Properti Notion | Format / Aturan |
|---|---|
| Name | Nama tools dalam huruf UPPERCASE |
| URL / Link
```


## 4. Excute 

Prompt use based on file or ask agents directly


### Create Column based on File
```
Intergrated MCP Notion, read `@book-summary-mcp/AGENTS.md:4-6` and create coloumn based on `@book-summary-mcp/AGENTS.md:13-38 `

``` 
### Create Column ASK Agents Direclty

```
Tambahkan property baru ke database Notion dengan ID 
3e0005e201ae80a08867e3915e1d6990

Property | Type | Fungsi / Contoh
Description | Text | Deskripsi 

```
