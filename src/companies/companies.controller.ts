import { TestsGuard } from './../users/test.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('api/v1/companies')
export class CompaniesController {
  constructor( private readonly companiesService: CompaniesService) {}
  
 
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto , @User() user:IUser) {
    console.log(user)
    return this.companiesService.create(createCompanyDto,user);
  }

  @Public()
  @ResponseMessage("Fetch list company with page panigation ")
  @Get()
  findAll(@Query("current") currentPage:string,
          @Query("pageSize") limit:string,
          @Query() qs:string 
  ) {
    //const currentPage:string=req.query @Req:Request tu express
    // return qs : Neu return ve qs no se la 1 object bao gom cac thuoc tinh co key la query va value la value

    // query sang number , vi lay o request no van la string
    return this.companiesService.findAll(+currentPage , +limit,qs);
  }
  @Public()
  @Get(':id')
  @ResponseMessage("Lấy ra chi tiết công ty")
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto ,@User() user:IUser) {
    return this.companiesService.update(id, updateCompanyDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user:IUser) {
    return this.companiesService.remove(id,user);
  }
}
