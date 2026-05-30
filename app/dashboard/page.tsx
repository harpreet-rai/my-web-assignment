import { createClient } from '@supabase/supabase-js';
import DashboardClient from '../components/DashboardClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const revalidate = 0;

export default async function DashboardPage() {
  try {
    if (supabaseUrl.includes('placeholder')) {
      return <DashboardClient courses={[]} />;
    }

    const { data: courses, error } = await supabase
      .from('courses')
      .select('id, title, progress, icon_name')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return <DashboardClient courses={courses || []} />;
  } catch (error) {
    console.error('Database connection bypass:', error);
    return <DashboardClient courses={[]} />;
  }
}