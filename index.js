export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const fileId = url.searchParams.get('file_id');
    
    // Yahan wahi token dalo jo aapke python bot mein hai
    const BOT_TOKEN = "8899795978:AAFsvo8TPPE60uPudNDNpqEpsro2NYqEASg";
    
    if (!fileId) return new Response("Error: No file_id", { status: 400 });

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
      const data = await response.json();
      if (!data.ok) return new Response("Invalid File ID", { status: 400 });

      const filePath = data.result.file_path;
      return Response.redirect(`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`, 302);
    } catch (err) {
      return new Response("Error: " + err.message, { status: 500 });
    }
  }
}
  ;
