

export default function middleware(request,res) {
    const token = request.cookies.get('token');
    if(!token) {
       return res.redirect(new URL('/login', request.url));
    }
    }