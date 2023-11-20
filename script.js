const express = require('express');
const app = express();
const cors = require('cors');
const {createClient} = require('@supabase/supabase-js');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend (replace with your frontend URL)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  credentials: true, // Allow credentials (if required)
}));
const SUPABASE_URL = "https://liowflmmnghgmudmppnu.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb3dmbG1tbmdoZ211ZG1wcG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MjAwNTYsImV4cCI6MjAxNTA5NjA1Nn0.mz1fv7QcnWWM31zuhmUnM4dGRel-q-cuvIoCKtlnJVs";

const supabase = createClient(SUPABASE_URL,SUPABASE_API_KEY);

app.get("/home",async(req,res) => {
  try {
    const studentsCount = await supabase.from('Students').select('count', { count: 'exact' });
    const roomsCount = await supabase.from('Rooms').select('count', { count: 'exact' });
    const blocksCount = await supabase.from('Blocks').select('count', { count: 'exact'});
    const staffsCount = await supabase.from('Staffs').select('count', {count: 'exact'})

    const studentsCountValue = studentsCount.data[0].count;
    const roomsCountValue = roomsCount.data[0].count;
    const blocksCountValue = blocksCount.data[0].count;
    const staffsCountValue = staffsCount.data[0].count;

    res.json({ studentsCount: studentsCountValue, roomsCount: roomsCountValue, blocksCount: blocksCountValue, staffsCount: staffsCountValue});
  } catch (error) {
    console.error('Error retrieving counts:', error);
    res.status(500).send('Error retrieving counts');
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => console.log(`Server is running on ${PORT}`));
