import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('api/v1/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ResponseMessage("Upload single file")
  @UseInterceptors(FileInterceptor('fileUpload'))
  uploadFile(@UploadedFile(
    // new ParseFilePipeBuilder()
    // .addFileTypeValidator({
    //   fileType: /^(jpg|jpeg|png|image\/png|image\/jpeg|gif|txt|pdf|application\/pdf|doc|docx|text\/plain)$/i
    // })
    // .addMaxSizeValidator({
    //   maxSize: 1000*1024*1024  //1mb
    // })
    // .build({
    //   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY //Ma loi 422 : Khong the xử lí được 
    // }),
  ) file: Express.Multer.File) {
    return {
      fileName:file.filename
    }

    //Làm sao để validate được file ?
    
    

    //Lưu file ở đâu ? 
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
