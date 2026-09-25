export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === 'admin';
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // User dashboard (future)
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');

      if (isOnAdminPanel) {
        if (isAdmin) return true;
        // Allow access to admin login page
        if (nextUrl.pathname === '/admin/login') return true;
        return false; // Redirect unauthenticated or non-admin users
      } else if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users
      } else if (isLoggedIn) {
        // Redirect logged-in users away from login/register pages
        if (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')) {
            return Response.redirect(new URL('/', nextUrl));
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

  },
  providers: [], // Add providers with an empty array for now
};
