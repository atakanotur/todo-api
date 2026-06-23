# Todo API 🚀

Modern, güvenilir ve ölçeklenebilir bir Todo API altyapısı. Node.js, TypeScript, Express, Prisma ve PostgreSQL ile kurumsal standartlara uygun olarak geliştirilmiştir.

## 📌 İçindekiler
- [Başlarken](#-başlarken)
- [Yetkilendirme (Authentication)](#-yetkilendirme-authentication)
- [API Uç Noktaları (Endpoints)](#-api-uç-noktaları-endpoints)
  - [Kimlik Doğrulama (Auth)](#1-kimlik-doğrulama-auth)
  - [Görevler (Todos)](#2-görevler-todos)

---

## 🛠 Başlarken

Sunucu varsayılan olarak **`http://localhost:3000`** portunda çalışır. Tüm API istekleri `/api/v1` base URL'ine yapılmalıdır.

### Yerel Ortamda Çalıştırma:
1. Docker'ı başlatın.
2. `docker compose up -d` ile veritabanını ayağa kaldırın.
3. `npm install` ile bağımlılıkları indirin.
4. `npm run dev` komutu ile sunucuyu başlatın.

**Health Check:** `GET /health` ile sunucunun çalışıp çalışmadığını test edebilirsiniz.

---

## 🔐 Yetkilendirme (Authentication)

API, **JWT (JSON Web Token)** tabanlı yetkilendirme kullanmaktadır. Korumalı (Protected) endpoint'lere erişebilmek için HTTP isteğinin `Authorization` başlığına (header) JWT Token'ını eklemeniz zorunludur:

```http
Authorization: Bearer <your_access_token_here>
```

---

## 📡 API Uç Noktaları (Endpoints)

Base URL: `http://localhost:3000/api/v1`

### 1. Kimlik Doğrulama (Auth)

Kullanıcı kayıt, giriş ve oturum yönetimi için kullanılır.

#### **Kayıt Ol (Register)**
Yeni bir kullanıcı hesabı oluşturur.
- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Gerekli mi:** Hayır
- **Request Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "strongPassword123" // En az 6 karakter
  }
  ```
- **Response (201 Created):** `accessToken`, `refreshToken` ve `user` nesnesi döner.

#### **Giriş Yap (Login)**
Mevcut kullanıcı ile giriş yapar ve token alır.
- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Gerekli mi:** Hayır
- **Request Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "strongPassword123"
  }
  ```
- **Response (200 OK):** `accessToken`, `refreshToken` ve `user` nesnesi döner.

#### **Token Yenile (Refresh Token)**
Süresi dolan erişim token'ını (Access Token) yeniler.
- **URL:** `/auth/refresh`
- **Method:** `POST`
- **Auth Gerekli mi:** Hayır
- **Request Body (JSON):**
  ```json
  {
    "refreshToken": "your_refresh_token_here"
  }
  ```
- **Response (200 OK):** Yeni `accessToken` ve `refreshToken` döner.

#### **Çıkış Yap (Logout)**
Kullanıcı oturumunu kapatır ve Refresh Token'ı veritabanından siler.
- **URL:** `/auth/logout`
- **Method:** `POST`
- **Auth Gerekli mi:** **Evet (Bearer Token)**
- **Response (200 OK):** Çıkış başarılı mesajı döner.

---

### 2. Görevler (Todos)

Bu endpoint'lerin tamamı için **Auth (Bearer Token) gereklidir**.

#### **Yeni Todo Oluştur (Create)**
- **URL:** `/todos`
- **Method:** `POST`
- **Request Body (JSON):**
  ```json
  {
    "title": "Alışveriş yapılacak", // Zorunlu
    "description": "Süt, ekmek ve yumurta alınacak", // Opsiyonel
    "completed": false // Opsiyonel (Varsayılan: false)
  }
  ```
- **Response (201 Created):** Oluşturulan Todo objesi.

#### **Tüm Todo'ları Listele (Get All)**
Kullanıcının kendi oluşturduğu tüm görevleri listeler.
- **URL:** `/todos`
- **Method:** `GET`
- **Response (200 OK):** Array formatında Todo listesi.

#### **Tekil Todo Getir (Get by ID)**
Belirtilen ID'ye sahip görevin detaylarını getirir.
- **URL:** `/todos/:id`
- **Method:** `GET`
- **Response (200 OK):** İlgili Todo objesi.

#### **Todo Güncelle (Update)**
Belirtilen ID'ye sahip görevi günceller (Sadece gönderilen alanlar güncellenir).
- **URL:** `/todos/:id`
- **Method:** `PUT`
- **Request Body (JSON):** *(Aşağıdaki alanların tümü opsiyoneldir)*
  ```json
  {
    "title": "Market alışverişi",
    "description": "Ekstra kahve alınacak",
    "completed": true
  }
  ```
- **Response (200 OK):** Güncellenmiş Todo objesi.

#### **Todo Sil (Delete)**
Belirtilen ID'ye sahip görevi kalıcı olarak siler.
- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **Response (200 OK):** Başarı mesajı döner.

---

*Bu dökümantasyon otomatik olarak oluşturulmuştur.*
