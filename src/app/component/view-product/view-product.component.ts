import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductSearch } from 'src/app/_model/product-search.modal';
import { BrandService } from 'src/app/_service/brand-service/brand.service';
import { CategoryServiceService } from 'src/app/_service/category-service/category-service.service';
import { ProductService } from 'src/app/_service/product-service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  totalPage = 0;
  pageSize = 10;
  total;
  page;
  currentPage = 1;

  rowData

  productSearch: ProductSearch = new ProductSearch();

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryServiceService,
    private brandService: BrandService
  ) { }

  ngOnInit() {
    this.getAllProduct(1);
    this.getAllCategory();
    this.getAllBrand();
  }


  listCategory;
  getAllCategory(){
    this.categoryService.getListCategory().subscribe((res:any)=>{
      this.listCategory = res.data;
      console.log(this.listCategory);
    })
  }

  listBrand;
  getAllBrand(){
    this.brandService.getAllBrand().subscribe((res:any)=>{
      this.listBrand = res.data;
      console.log(this.listBrand);
    })
  }


  clickCategorySerch(item){
    this.productSearch.categoryId = item.id;
    this.getAllProduct(1);
  }

  clickBrandSerch(item){
    this.productSearch.brandId = item.id;
    this.getAllProduct(1);
  }


  objSearch: any = {};
  getAllProduct(page){
    this.objSearch = {
      data: {
        status: this.productSearch.status,
        keySearch: this.productSearch.keySearch,
        categoryId: this.productSearch.categoryId,
        brandId: this.productSearch.brandId
      },
      page: page - 1,
      pageSize: this.pageSize
    }

    this.currentPage = page;
    this.productService.getAllProduct(this.objSearch).subscribe((res:any) => {
      this.rowData = res.data.content
      console.log(this.rowData);
      
      this.total = res?.data?.totalElements;
      this.totalPage = res?.data?.totalPages;

      this.changeDetectorRef.detectChanges();
     },
     (error) => {
     }
   );
  }

}
