const express = require('express');
const cors = require('cors');

const rw = require('./util/readJSON');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/getfiles', async (req, res) => {
    rw.readDir(null,(err, files) => {
        if(err){
            res.status(400).send({
                data:{},
                error:{
                    "error":"Faulty Folder"
                }
            });
        }
        res.status(200).send({
            data:files,
            error:{}
        });
    });
});
app.post('/removefile/:fileName', async (req, res) => {

    const fileName = req.params.fileName;
    if( await rw.removeFile(fileName)){

        res.status(200).send({
            msg:"file successfully removed"
        });
    }else{
        res.status(400).send({
            msg:"file could not be removed"
        });
    }
});
app.get('/readJSON/:fileName', async (req,res) => {

    const fileName = req.params.fileName;
    
    if( await rw.fileExists(fileName)){

        rw.readJSON(fileName,(err,file) => {
            if(err){
                res.status(400).send({
                    data:{},
                    error:{
                        "error":`${fileName} does not exist`
                    }
                });
            }
            res.status(200).send({
                data:file,
                error:{}
            });
        });

    }else{
        res.status(400).send({
            data:{},
            error:{
                "error":`${fileName} does not exist`
            }
        });
    }
    
});

app.post('/writeJSON/:fileName', async (req,res) => {

    const fileName = req.params.fileName;
    const data = req.body;

    const JSONWrite = await rw.writeJSON(fileName,data);
    
    JSONWrite === true 
    ?
    res.status(201).send({message: "JSON written successfully"})
    :
    res.status(400).send({message: "Problem in writing JSON file"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is listening on PORT ${PORT}`));

