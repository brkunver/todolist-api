# todolist-api

Üye kaydı olunabilen ve yapılacak not eklenebilen backend api

- Express kullanarak yapılmıştır.
- Veritabanı olarak MongoDB atlas kullanılmıştır.
- Giriş yöntemi olarak Json Web Token kullanılmıştır.

API Link : https://todolist-api.up.railway.app/


## Api kullanımı

### Üye olma

- API'a üye olmak için `<ana link>/api/v1/signup` adresine json formatında POST request atmanız gerekli. Body içinde `username` ve `password` adlı değişkenler olması lazım. Geri cevap olarak içinde boolean : `success` ve string : `response` içeren json göndericektir. Eğer başarılı olur ise bu aşamadan sonra giriş yapabilirsiniz

### Giriş yapma

- Giriş yapmak için `<ana link>/api/v1/login` adresine json formatında POST request atmanız gerekli. Body içinde `username` ve `password` adlı değişkenler olması lazım. Geri cevap olarak içinde boolean : `success` ve string : `response` içeren json göndericektir Ayrıca `token` header değişkenini Jwt token ile değiştirecektir. 

### Todoları isteme

- Tüm todo listesini istemek için `<ana link>/api/v1/gettodo` adresine GET request atmanız gerekli. Sadece headerda `token` değişkeninde giriş yaptığınızda sunucunun size gönderdiği jwt token olmalı. Geri cevap olarak Json içinde `data` adıyla bir todo arrayi dönecektir. 

### Todo ekleme

- Todo eklemek için `<ana link>/api/v1/addtodo` adresine POST request atmanız gerekli. Header'da `token` değişkeni içinde jwt tokenınız olmalı ve body'de json içinde `todo` değişkeninde eklenecek todo objesi olmalı. `todo` objesi içinde todo : string ve checkhed : boolean olmalı

### Todo silme
- Todo silmek için `<ana link>/api/v1/deletetodo` adresine DELEETE request atmanız lazım. Header'da `token` değişkeni içinde jwt tokenınız olmalı ve body'de json içinde `id` değişkeninde silinecek todo'nun id'si olmalı.
