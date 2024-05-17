<template>
  <div>
    <el-button @click="handleUpload">업로드</el-button>
    <el-button @click="openAddModal">추가</el-button>
    <el-button @click="downloadData">다운로드</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      >
        <template slot-scope="scope">
          <img
            v-if="column.prop === '사진'"
            :src="scope.row[column.prop]"
            alt="Image"
            style="width: 50px; height: auto"
          />
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="uploadDialogVisible" title="엑셀 업로드">
      <upload-component @file-uploaded="handleFileUpload" />
    </el-dialog>

    <el-dialog :visible.sync="addEditDialogVisible" title="추가/수정">
      <el-form>
        <el-form-item label="품번 등록">
          <el-input v-model="form.productNumber"></el-input>
        </el-form-item>
        <!-- Add other fields similarly -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEditDialogVisible = false">취소</el-button>
        <el-button type="primary" @click="handleSubmit">저장</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { utils, writeFile } from "xlsx";
import XlsxPopulate from "xlsx-populate";
import UploadComponent from "./UploadComponent.vue";

export default {
  components: {
    UploadComponent,
  },
  data() {
    return {
      tableData: [],
      columns: [
        { prop: "품번", label: "품번" },
        { prop: "사진", label: "사진" },
        // Define other columns similarly
      ],
      uploadDialogVisible: false,
      addEditDialogVisible: false,
      form: {
        productNumber: "",
        // Other form fields
      },
    };
  },
  methods: {
    handleUpload() {
      this.uploadDialogVisible = true;
    },
    handleFileUpload(file) {
      XlsxPopulate.fromDataAsync(file).then((workbook) => {
        const sheet = workbook.sheet(0);
        const usedRange = sheet.usedRange();
        const values = usedRange.value();
        const headers = values[0];
        const rows = values.slice(1);

        const jsonData = rows.map((row) => {
          const rowData = {};
          row.forEach((cell, index) => {
            rowData[headers[index]] = cell;
          });
          return rowData;
        });

        // Extract images and convert to Base64
        const images = sheet.images();
        images.forEach((image) => {
          const base64 = image.base64();
          const cell = image.range().cell(0, 0);
          const address = cell.address();
          const rowIndex = parseInt(address.match(/\d+/)[0]) - 2; // Adjust for 0-based index and header row
          jsonData[rowIndex]["사진"] = base64;
        });

        this.tableData = jsonData;
        this.uploadDialogVisible = false;
      });
    },
    openAddModal() {
      this.addEditDialogVisible = true;
    },
    handleSubmit() {
      this.tableData.push(this.form);
      this.addEditDialogVisible = false;
      // Reset form
      this.form = { productNumber: "" /* other fields */ };
    },
    downloadData() {
      const ws = utils.json_to_sheet(this.tableData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Sheet1");
      writeFile(wb, "tableData.xlsx");
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
