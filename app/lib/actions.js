'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function addProduct(prevState, formData) {
  try {
    await dbConnect();
    
    const name = formData.get('name');
    const price = formData.get('price');
    const category = formData.get('category');
    const description = formData.get('description');
    const unit = formData.get('unit');
    const certification = formData.get('certification');
    const imageFile = formData.get('image');

    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = Date.now() + '-' + imageFile.name.replaceAll(' ', '_');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    await Product.create({
      name,
      price,
      category,
      description,
      unit,
      certification,
      stockQuantity: Number(formData.get('stockQuantity') || 0),
      inStock: Number(formData.get('stockQuantity') || 0) > 0,
      image: imagePath,
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
    return { message: 'Product added successfully!' };
  } catch (error) {
    console.error('Error adding product:', error);
    return { message: 'Failed to add product.' };
  }
}

export async function deleteProduct(id) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product.');
  }
}

export async function toggleProductStock(id, inStock) {
  try {
    await dbConnect();
    await Product.findByIdAndUpdate(id, { inStock });
    revalidatePath('/admin/products');
    revalidatePath('/');
  } catch (error) {
    console.error('Error updating stock:', error);
    throw new Error('Failed to update stock.');
  }
}

export async function updateProduct(id, prevState, formData) {
  try {
    await dbConnect();
    
    const name = formData.get('name');
    const price = formData.get('price');
    const category = formData.get('category');
    const description = formData.get('description');
    const unit = formData.get('unit');
    const certification = formData.get('certification');
    const stockQuantity = Number(formData.get('stockQuantity') || 0);
    const imageFile = formData.get('image');

    const updateData = {
      name,
      price,
      category,
      description,
      unit,
      certification,
      stockQuantity,
      inStock: stockQuantity > 0,
    };

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = Date.now() + '-' + imageFile.name.replaceAll(' ', '_');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      updateData.image = `/uploads/${filename}`;
    }

    await Product.findByIdAndUpdate(id, updateData);

    revalidatePath('/admin/products');
    revalidatePath('/');
    return { message: 'Product updated successfully!' };
  } catch (error) {
    console.error('Error updating product:', error);
    return { message: 'Failed to update product.' };
  }
}

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function authenticateAdmin(prevState, formData) {
  const { email, password } = Object.fromEntries(formData);
  
  try {
    await dbConnect();
    // Pre-check role before attempting sign-in to give better error message
    // and prevent non-admins from logging in via this route
    const user = await User.findOne({ email });
    
    if (user && user.role !== 'admin') {
      return 'Access denied. Admin privileges required.';
    }

    await signIn('credentials', { 
      email, 
      password, 
      redirectTo: '/admin' 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid admin credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(prevState, formData) {
  const { name, email, password } = Object.fromEntries(formData);

  try {
    await dbConnect();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return 'User already exists.';
    }

    await User.create({ name, email, password });
  } catch (error) {
    return 'Failed to register user.';
  }
  
  // Login after registration
  try {
    await signIn('credentials', { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
  }
}

const SUPER_ADMIN_EMAIL = 'admin@auralinaa.com';

export async function handleSignOut() {
    await signOut();
}

export async function createUserByAdmin(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const requestedRole = formData.get('role') || 'user';

  try {
    const session = await auth();
    const isSuperAdmin = session?.user?.email === SUPER_ADMIN_EMAIL;

    // Only Super Admin can create Admin accounts
    let role = requestedRole;
    if (requestedRole === 'admin' && !isSuperAdmin) {
      return { error: 'Only the Super Admin (admin@auralinaa.com) can create Admin accounts.' };
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: 'User with this email already exists.' };
    }

    await User.create({ name, email, password, role });
    revalidatePath('/admin/users');
    return { success: `Successfully created ${role} account!` };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user.' };
  }
}

export async function toggleUserRole(userId, currentRole) {
  try {
    const session = await auth();
    const currentUserEmail = session?.user?.email;
    const isSuperAdmin = currentUserEmail === SUPER_ADMIN_EMAIL;

    if (!isSuperAdmin) {
      return { error: 'Only the Super Admin (admin@auralinaa.com) can change user roles.' };
    }

    await dbConnect();

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return { error: 'User not found in database.' };
    }

    // Prevent demoting self
    if (targetUser.email === currentUserEmail) {
      return { error: 'You cannot demote your own account.' };
    }

    // Prevent demoting Super Admin
    if (targetUser.email === SUPER_ADMIN_EMAIL) {
      return { error: 'Super Admin account role cannot be changed.' };
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await User.findByIdAndUpdate(userId, { role: newRole });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { error: 'Failed to update user role.' };
  }
}

export async function deleteUser(userId) {
  try {
    const session = await auth();
    const currentUserEmail = session?.user?.email;

    await dbConnect();

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return { error: 'User not found in database.' };
    }

    // Prevent self deletion
    if (targetUser.email === currentUserEmail) {
      return { error: 'You cannot delete your own account.' };
    }

    // Prevent deleting Super Admin
    if (targetUser.email === SUPER_ADMIN_EMAIL) {
      return { error: 'Super Admin account cannot be deleted.' };
    }

    await User.findByIdAndDelete(userId);
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: 'Failed to delete user.' };
  }
}



