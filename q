[33mcommit 15a929d39bc8578e86d860de6552fec9db3eb459[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mfeature/product-disabling-system[m[33m, [m[1;31morigin/feature/product-disabling-system[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 11 12:36:06 2025 -0300

    enhancement: improvement in UX/UI

[33mcommit baaedba9787935c6669075cda59ad083324059ee[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 11 11:55:07 2025 -0300

    feat: create endpoint for enableVariants and ProductsDisabledPage

[33mcommit 6805489f060cffaf9be8cbeb98696d0e5b24148b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 11 10:05:12 2025 -0300

    enhancement: Migrate submitVariant logic in useVariants to ProductModal

[33mcommit 484957df13ec415c1c0144fbe0ff630a263d97af[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 10 14:11:16 2025 -0300

    fix: Fix errors when creating, editing products, or adding variants to existing products

[33mcommit 39227f41ee00b7212b9d2616daabac3ed88e3a64[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 10 09:35:35 2025 -0300

    feat: create disableVariant function and add middleware in PATCH endpoint

[33mcommit a2e56a2a7cabe5cdbfa8462211aca262d1e8ad0e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 10 09:29:55 2025 -0300

    feat: create endpoint for disableVariant

[33mcommit 11f56fd9b846e1aeb0fc3efc566f2dc270ca2ab3[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 10 09:03:59 2025 -0300

    feat: add field 'disabled' in products and productVariant models of schema.prisma

[33mcommit 8fa462cdff248e0355c8875c0231d83cca4b452c[m[33m ([m[1;31morigin/main[m[33m, [m[1;32mmain[m[33m)[m
Merge: 066bfc1 487904a
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Wed Sep 10 08:30:14 2025 -0300

    Merge pull request #46 from AndresSilva12/feat/implement-pagination-in-productsPage
    
    Feat: Implement pagination in products page

[33mcommit 487904a68597fc02c110f093ffbe6509fc8be0cb[m[33m ([m[1;31morigin/feat/implement-pagination-in-productsPage[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 19:32:21 2025 -0300

    fix: correct error in productVariant.controller to calculate totalCount

[33mcommit 2f10cad678fb5867b698fa8ea3cb53a0dce4d300[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 19:00:16 2025 -0300

    feat: implement pagination in ProductsPage

[33mcommit 723d70aac09aa9a747809f8ad3cdc234363091c1[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 17:46:39 2025 -0300

    feat: add logic for pagination in 'productVariant.controller.js'

[33mcommit 066bfc1c4db6a1036f5f14f493c4ff33faec7642[m
Merge: 40395c6 3b203bd
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Tue Sep 9 16:58:37 2025 -0300

    Merge pull request #44 from AndresSilva12/feature/implement-update-category
    
    Feature: Implement update category

[33mcommit 3b203bd4fccf0af42385cd3246be600f4698a4cc[m[33m ([m[1;31morigin/feature/implement-update-category[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 16:42:40 2025 -0300

    enhancement: Small interface improvement on categories page

[33mcommit 59d995be5c8525bc37cf27a7de1d1c879d5d3644[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 16:35:49 2025 -0300

    feat: implement updateCategory in Categories Page and modularize CategoryForm

[33mcommit 34b267aee42465d4c55db1e969e0aa6a8a005532[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 15:47:42 2025 -0300

    enhancement: replace Categories Page logic for useCategories

[33mcommit 930feda0233857152f97709578d4da6ba70761bf[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 15:46:44 2025 -0300

    feat: create custom hook for modularize categories

[33mcommit 16ec98f2c6bf15f0939d76f7bf61a87ed9c229d9[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 13:09:25 2025 -0300

    feat: create middlewares and endpoint for updateCategory

[33mcommit 73047f31f9212cc584078410c0438dd3e51ae60c[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 12:19:47 2025 -0300

    feat: create 'validateCategoryExist' middleware

[33mcommit 40395c6d87ad478e9771bbac8368996d1fb52143[m
Merge: 2fb2313 f8fbd07
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Tue Sep 9 12:10:14 2025 -0300

    Merge pull request #42 from AndresSilva12/enhancement/improvement-sales-and-entries-page
    
    Enhancement: Improvement sales and entries page

[33mcommit f8fbd07740219adec52e3121c0e09e19263809b6[m[33m ([m[1;31morigin/enhancement/improvement-sales-and-entries-page[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 10:18:13 2025 -0300

    feat: create pagination on StockEntriesPage  and implement Chakra Pagination Component

[33mcommit 583c6c7712a0035ac02e698093d3ce943b89a312[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 9 10:07:29 2025 -0300

    feat: create pagination on salesPage and implement Chakra Pagination Component

[33mcommit 73825bb75661743273074fd9bac44bc84a17b65d[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 21:35:02 2025 -0300

    enhancement: improvement UX/UI in Sales and StockEntries Pages

[33mcommit dc0599099fcf20f04eb16b1c7b73a2baf603ba7e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 20:59:33 2025 -0300

    feat: implement dinamic filters on SalesPage

[33mcommit 205b57bb8d59d60d3095e16e6984aff700103656[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 20:27:54 2025 -0300

    feat: implement react-calendar component in Stock Entries Page and dinamic query

[33mcommit 389aa61dfafcbcdef466154ee0ea54e427bd43bf[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 20:16:13 2025 -0300

    feat: implement filterByDate function in metrics query

[33mcommit 0dee766adda531fc1cbcbdc95a478e7afcf14e23[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:49:50 2025 -0300

    feat: implement filterByDate function in stockEntries query

[33mcommit fca19a6883a7caba78be2931c58653646a05517d[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:48:54 2025 -0300

    feat: Create a reusable function for a dynamic date filter

[33mcommit ec9e60d19baca5b728dbc7ec41f021fdec3e581b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:24:37 2025 -0300

    feat: add deleteEntry function in StockEntries Page

[33mcommit 2e55aefc8117ff6ff7a60429a99ce3d13169d16b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:18:45 2025 -0300

    feat: implement DELETE fetch in custom hook 'useStockEntries'

[33mcommit 742abe0a5b16f34c01c5a1e4a0a6502b9e7d76ab[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:11:27 2025 -0300

    feat: implement deleteEntry function on 'stockEntries.route.js'

[33mcommit a42c8d17fc564ea68b2a7317e36f2100289e5478[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 19:07:50 2025 -0300

    feat: Create entrie existence validation middleware

[33mcommit 0c1b6e9276ce08906e4ab038a4188c013be81bed[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 18:57:12 2025 -0300

    feat: implement DELETE fetch in SalesPage

[33mcommit 26e32b7e48eeb941bb14289b2dfc8965d3c25f1a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 18:43:30 2025 -0300

    fix: discard PUT endpoint and updateSale function

[33mcommit 7e7e2d96770b445e8fdaeb5dda3bea0a1b5f4d87[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 11:29:25 2025 -0300

    fix: Add 'include' property to Prisma query in 'validateSaleExist'

[33mcommit 5eeab8866d07d121e88490879b634c428cce4a76[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 11:23:48 2025 -0300

    feat: create endpoint for update sales

[33mcommit c38a9cc28ee25dcc4123ff769428dd03530dfe59[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 11:22:40 2025 -0300

    feat: implement validateSaleExist on DELETE/ sales endpoint

[33mcommit 728052d2d942a72b0c101a144e7e926f23930bf9[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 11:17:03 2025 -0300

    feat: create 'validateSaleExist' middleware

[33mcommit 3a782a7c6635160530f1350cdc48a3d2103dd516[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 8 11:07:45 2025 -0300

    feat: create updateSale function in 'sales.controller.js'

[33mcommit 2fb2313842f4fd28decb934f94ad93a9466e993a[m
Merge: 57ff064 e0d0f62
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Mon Sep 8 10:49:13 2025 -0300

    Merge pull request #40 from AndresSilva12/feature/implement-metrics-system
    
    Feature: Implement metrics system

[33mcommit e0d0f623d04fea2dbc98320fc5567a86209d9a7a[m[33m ([m[1;31morigin/feature/implement-metrics-system[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 19:58:05 2025 -0300

    feature: implement expenses validation with zodSchema in frontend and convert expense form into a reusable component

[33mcommit 3262b841535e6be8343931cfe4e0ad39c336b24a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 19:26:03 2025 -0300

    feature: create and implement expenses middlewares in backend

[33mcommit 1f571142804bdd3c23940947cb6c8a4ab4be7750[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 19:25:11 2025 -0300

    feature: create zodSchema for validate expenses

[33mcommit 9e391b5f17755f0a05b0ddc2e539fc63418547c0[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 18:57:55 2025 -0300

    feature: install pdfkit-table and finalize 'reporte.pdf'

[33mcommit dd3b8be6581ccce8c926d7bf773cfd0cb8308631[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 11:06:42 2025 -0300

    feature: install and implement pdfkit for download 'reporte.pdf'

[33mcommit f0823ea1a7687ee812c4a9270f6c921240de8d3e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Sep 5 10:00:49 2025 -0300

    feature: create endpoint for generate report and vinculate with frontend

[33mcommit 8cc607a43d80703825efc8818ea3cce8eddc8c56[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 19:47:03 2025 -0300

    enhancement: remove toastify  dependency and migrate to chakra toaster

[33mcommit 559df29954cc457ff46acbd44edbdafe64bfdb6a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 18:33:16 2025 -0300

    enhancement: remove imports and uninstall sweetAlert

[33mcommit c4260352d2f9d6b3fc3e5415ef9abeec53898f0f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 18:07:45 2025 -0300

    enhancement: Replace sweetAlert alerts with a reusable modal component and double-check before deleting.

[33mcommit 013fc36413e69f104c5327d8e4fd341114604bd2[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 12:23:41 2025 -0300

    feature: create updateExpense function and implement in dashboard page

[33mcommit 67b615ed677334ce04d352d34bc8ab6c393558c4[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 11:55:25 2025 -0300

    feature: create custom hook for Expenses and createExpense function

[33mcommit 97eef65e1c4c41657e9318010a58fa4774c316fe[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Sep 4 11:42:57 2025 -0300

    feature: Show only the top 5 best sellers in products and categories

[33mcommit be80275870b3f07586d64fc4492eab0adf2c8837[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 20:49:03 2025 -0300

    enhancement: improvement expense modal on dashboard page

[33mcommit b4696a9ad2ab2c29f09865e709efbb292755d58f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 20:30:35 2025 -0300

    enhancement: improvement modal size in ProductsPage

[33mcommit d76ab75a7dd23547312288b30548703ef50eab2a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 20:26:42 2025 -0300

    enhancement: improvement interface on category page

[33mcommit 9d49d031f551c67cc81b32cb108669548a3a9878[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 20:24:54 2025 -0300

    enhancement: allow modal size as a property

[33mcommit 727e28325e2eef5bfa334b4821636c7cd49d47e2[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 19:29:09 2025 -0300

    enhancement: improvement UX/UI in dashboard page and componentize charts

[33mcommit 170d0a774a68d48c4cb58f55d5afa22e3d09afe7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Sep 3 13:52:59 2025 -0300

    feature: install & implement react-calendar, and improvement in dashboard page

[33mcommit 3bde8702733f639183528b1a844e6bcbc531284e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 2 20:09:48 2025 -0300

    feature: implement data for categories most sales in dashboard Page

[33mcommit f558171b0e561205251a7585abca8c27a2aacbee[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 2 16:52:27 2025 -0300

    feature: implement ProductChart component in Dashboard Page

[33mcommit 7a584d63c674fc0a9fb4f84ec8a606758eeb1248[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 2 15:27:15 2025 -0300

    feature: implement sales group by products and profits, costs, revenue for each one

[33mcommit 901250109f1aa41aabecc31d8447fe1d16f39722[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Sep 2 00:07:49 2025 -0300

    feature: Implement metrics for net profit, costs, sales, revenue, and expenses on the dashboard page

[33mcommit dbf3fb5ac4a3379fed7ff05e8c299fb509e291b9[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 20:42:49 2025 -0300

    feature: Add logic to calculate weighted average price in sales middleware

[33mcommit 0a59b391dfea2ba40fa070e0ec48f40096182305[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 12:55:20 2025 -0300

    feature: add field 'purchasePrice' in saleItem model

[33mcommit 94060a73bd5145515dd547b9702905cbcdbcba2f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 12:24:37 2025 -0300

    feature: add fetchs 'GET' & 'POST' expenses endpoint in dashboard Page

[33mcommit 8216503e0b1769ee204db04ce743d54d552bed92[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 11:25:59 2025 -0300

    fix: Remove unnecessary queries and data in the metrics controller

[33mcommit 88a61c65d76cfa7b5357573c5ab31a41d9ea2c6c[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 11:16:51 2025 -0300

    feature: add expenses in metrics endpoint

[33mcommit abdce8a2ee51eac52fc838b34b07d1ae02273123[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Sep 1 11:04:29 2025 -0300

    enhancement: improvement metrics endpoint for filter by date

[33mcommit 327c66bceee9b26fdf72283d4acd661eef404cbc[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Aug 29 22:53:27 2025 -0300

    feature: create expenses model and basic CRUD with query filtered by month

[33mcommit 06997871915170627cacf3bdd3918a875f3c7a18[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Aug 29 20:04:20 2025 -0300

    enhancement: improvement de UX/UI in dashboard page using hardcoding data

[33mcommit 83b44d71a724cb5c46e7338fc6a58ebb6054a02b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 11:37:12 2025 -0300

    feature: implement fetch to metrics endpoint and dinamic filters in dashboard Page

[33mcommit 61a9602a3dcdbaf2d8c17aa7bf40b2082356432e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 11:04:40 2025 -0300

    feature: create endpoint to perform dashboard metrics on backend and allow dynamic query

[33mcommit 4a5e625b715cdae05ca0bae07d93ed0e90f3f0fc[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 09:14:28 2025 -0300

    feature: implement frontend logic for metrics in dashboard using stockEntries and sales

[33mcommit 3b684d308e2c7c8ac0eb2a0c0f884d0e420e6a61[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 09:12:38 2025 -0300

    fix: amend validations in zodSchema for sales

[33mcommit e432368ba76d7e314ae830dc609cda0d7042abe7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 09:11:02 2025 -0300

    feature: implement logic for total field in stockEntry

[33mcommit af1638c16866396d8f50f5922b15bf1469df251c[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 28 09:08:11 2025 -0300

    feature: add field total in stockEntry Model

[33mcommit 8235a33fb27088a517272a06bfeadc5b880d2702[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 27 19:39:28 2025 -0300

    feature: install charts and recharts from chakraUI

[33mcommit 57ff064b279bb69ea0b62c05ab390e102c32c043[m
Merge: 5a86e8f b389c1e
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Wed Aug 27 19:31:40 2025 -0300

    Merge pull request #38 from AndresSilva12/feature/implement-categories-table
    
    Feature: implement categories table

[33mcommit b389c1eb1e4600a8cd2e259695c6c1841f9ff530[m[33m ([m[1;31morigin/feature/implement-categories-table[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 27 18:53:04 2025 -0300

    feature: implement categories field in form of product modal and implement filter for category

[33mcommit b0aa7dd54aea068f334431c9ab5b383bee080f75[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 27 14:26:45 2025 -0300

    feature: create Categories Page and basic logic for 'POST' and 'GET' with fetch

[33mcommit c0ae57fb9a59a263e3261475d32b43b16b1af539[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 27 12:12:40 2025 -0300

    feature: implement logic for categories in products and variants controllers and middlewares

[33mcommit f16ebfc5f0f871729b7acf31b3ed04ac9f1d5004[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 27 11:48:43 2025 -0300

    feature: create model,CRUD and zod schema  for categories

[33mcommit 5a86e8ff325c44ed85d3bb7b8fdfb95cfd0b9880[m
Merge: 5373452 750ce59
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Tue Aug 26 12:01:50 2025 -0300

    Merge pull request #36 from AndresSilva12/feature/implement-search-system
    
    Feature: Implement search system and filters

[33mcommit 750ce598ddec5ae2b11e0c95fb4a0efb17ce2f73[m[33m ([m[1;31morigin/feature/implement-search-system[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Aug 26 11:40:44 2025 -0300

    enhancement: unified product and variant modal

[33mcommit 7bf4d29eb8cca239fc2accb7f408f8c2741c88e7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Sat Aug 23 17:43:10 2025 -0300

    feature: add debounce function and enhancement UI in productsPage

[33mcommit 4d815136160460115f1aa8da5ed72893a5480e11[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Sat Aug 23 16:44:33 2025 -0300

    fix: uncheck checkbox when refreshing a search

[33mcommit 9acffe8c2451fec5ce32def3e5bdb4c85eb68cc4[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 21 15:57:07 2025 -0300

    enhancement: add transform toLowerCase in zod schemas

[33mcommit a8540fcc77458438820d51c18923b516f37f29c9[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 21 15:21:55 2025 -0300

    enhancement: transferring filter logic to the backend

[33mcommit afba6a5451bd682fb955820b3e60660e5a0c4a8a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 21 12:42:30 2025 -0300

    fix: separate fetchSearch logic from customHook Variants and productContext

[33mcommit ab1bd1a8aa3276bb94512466d0207de19b985df0[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 21 11:48:28 2025 -0300

    fix: clear information in new product in ProductModal

[33mcommit 2194e7cc31dba7dc241bdeec84b4f1bf73056eaa[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Aug 19 16:57:04 2025 -0300

    feature: create SearchBar and implement filters in ProductsPage

[33mcommit 896155d0f3a82bdd1c731c57fb45b4b21680ac37[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 14 17:31:22 2025 -0300

    feature: add orderBy in 'getVariants' endpoint

[33mcommit 1d7ce50f7082333a5ca8af5c22cee9bc1599d8cf[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 14 17:15:52 2025 -0300

    feature: add filters in 'getVariants' endpoint

[33mcommit 685f208520697f3821ef67b201d1af1a18e3a107[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 14 16:28:05 2025 -0300

    feature: add filters in 'getProducts' endpoint

[33mcommit 5373452429c6e5d8f61abd4cda5ca7a41b1ff08a[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 13 20:57:47 2025 -0300

    fix: stock increment duplication on variant creation

[33mcommit 8420745b02259d30e207a9c59644a8ac3cc27f87[m
Merge: bc9bd2a 33717c1
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Wed Aug 13 18:30:01 2025 -0300

    Merge pull request #35 from AndresSilva12/feature/session-handling
    
    Feature: Session management with Refresh Token and authentication improvements

[33mcommit 33717c180ee304ba147d726c3af3226253202304[m[33m ([m[1;31morigin/feature/session-handling[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 13 18:09:55 2025 -0300

    enhancement: remove hardcoded userId in sales and improvement in stockEntries and sales Pages

[33mcommit 08c1027389c979b97001938d64297b53d2c75afd[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 13 17:53:06 2025 -0300

    feature: implement periodic refresh token request every 10 minutes in AuthContext

[33mcommit 7a6d58ba95cab0dee96a5b88750546ff2a75af85[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Aug 13 15:40:46 2025 -0300

    feature: implement refreshToken, add authenticate middleware, and remove hardcoded userId in stockEntries

[33mcommit bc9bd2a4cabdc9cc57a0c7cfab5491e825e1fd14[m
Merge: ab9acc5 2dda5cf
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Tue Aug 12 13:38:51 2025 -0300

    Merge pull request #34 from AndresSilva12/feature/implement-sales-system
    
    Feature: Implement Sales System and Stock Entries

[33mcommit 2dda5cf62593848fc24664f031fd430666524a7b[m[33m ([m[1;31morigin/feature/implement-sales-system[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Aug 12 13:21:15 2025 -0300

    fix: corrected the destination model and the logic for 'purchasePrice' field and add 'unitPrice' field in saleItem model

[33mcommit bf9f0414cc144acf0f4772a21b131458056d5313[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 7 18:01:47 2025 -0300

    enhancement: add more information in EntrySelectedModal and SaleSelectedModal

[33mcommit 9dbbe248a34abe37190fcf607348ddff2ba80e41[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 7 17:32:04 2025 -0300

    implement 'select motive' in CartDrawer and create field 'motive' in sales model

[33mcommit 1fe9b2171be6dbcb3ec2affee9bf8e830ef14f0f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 7 16:54:28 2025 -0300

    feature: implement 'select motive' in variantModal and connect with useVariants hook

[33mcommit 843c04174830d5dec0d65c8569aef1431c6d7b0f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Aug 7 13:38:06 2025 -0300

    feature: create EntriesPage and enhancement cart logic

[33mcommit 2dddf598cc8f22d670a1a9d1ae6019012ad6c5df[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Aug 1 17:58:47 2025 -0300

    feature: create SalesPage and enhancement cart components and NavBar

[33mcommit 2e8473dbe20e77e682715ace1ad3f7a596b4fa2d[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Aug 1 12:09:14 2025 -0300

    feature: ensure numeric quantity handling ,refresh product stock after cart purchase and clearCart after buy

[33mcommit e07dea6e0c056b69f5693ce73293d86c17e6bdbc[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Aug 1 11:33:36 2025 -0300

    feat: add cart context with quantity and total logic, implement global CartDrawer and integrate with navbar

[33mcommit 278c11cc8aca23bd01e5bf94c7f1d20195d8de8c[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jul 30 17:21:34 2025 -0300

    fix: update Zod schemas for sales and stock entries validation

[33mcommit f7c0a5fb090dd21465680698bf6699dda4922473[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jul 30 12:34:28 2025 -0300

    feature: validate variant existence before deleting stockEntry or sale, and ensure atomic operations with Prisma transactions

[33mcommit 44a712f3c9b9030179e32c047c3702591bd15485[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jul 30 11:02:10 2025 -0300

    feature: use Prisma transactions for atomic sales and stock updates

[33mcommit a1d117152f828e8fe75f563b2ce027e32db89f06[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jul 29 15:49:58 2025 -0300

    feature: add zod validations and middlewares for sales and stock entries

[33mcommit 5a4f91ede313c7e72cafa96a90c0d648c4fd126b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 21:04:43 2025 -0300

    feature: add logic to update stock in sales and stockEntry controllers

[33mcommit 6102da82087ca33b05a63fed6c17772e62da9c35[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 18:40:12 2025 -0300

    feature: implement CRUD for entries and stockEntry items with cascade delete

[33mcommit 02e007bb64869c846b3cfbb3e62a2d65742b9096[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 17:51:25 2025 -0300

    feature: implement CRUD for sales and sale items with cascade delete

[33mcommit 1b5262f95024f9a7164ef567915b6fbc97eab5c1[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 16:52:34 2025 -0300

    feature: create model and relation for stock entries

[33mcommit ae3888339cef45ce2d2df3f296b0faf850113aa0[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 16:37:40 2025 -0300

    feature: create model and relation for sales

[33mcommit ab9acc5f338ef91dd89a76a28ac2aa5f8d1db36a[m
Merge: b28b8cc 8c25cbb
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Mon Jul 28 12:58:55 2025 -0300

    Merge pull request #33 from AndresSilva12/enhancement/integrate-ui-framework
    
    Enhancement: Integrate Chakra UI and improve overall UI components

[33mcommit 8c25cbbff1dd3c772c7d42841c5b14ab9659284d[m[33m ([m[1;31morigin/enhancement/integrate-ui-framework[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 12:52:39 2025 -0300

    chore: add root .gitignore and remove node_modules from repo

[33mcommit 2502581ed51e10f5e08e9a5265982eb8dd872a27[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 12:03:51 2025 -0300

    chore: add .gitignore to ignore dependencies and builds

[33mcommit 88cb879c757624d85ee4820f239d70892c65dfc6[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 11:28:36 2025 -0300

    enhancement: improve users and products page and forms UI

[33mcommit caa25b57357278798fc66d32915a790daf8da9fc[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 28 10:27:35 2025 -0300

    enhancement: remove unused tailwind styles

[33mcommit 72aa5d1c0a2ce3463bc8671b4311d5537b24616f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Sun Jul 27 21:04:14 2025 -0300

    enhancement: improved UI for modals, cards and forms

[33mcommit a39a93c8b3bee175e171cc96bd791a01d665bbc7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jul 24 14:31:16 2025 -0300

    enhancement: replace Tailwind styles with Chakra UI components in dialogs, cards, navbar, buttons, and accordion

[33mcommit 8ceee9fbb54ce94efd8eacb1344cdafb644957cf[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 21 20:42:23 2025 -0300

    chore: install and configure Chakra UI

[33mcommit b28b8cc588d72f2b98be15256139e0fd18ba5327[m
Merge: 97a7a2e bc6acf8
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Wed Jul 16 17:23:26 2025 -0300

    Merge pull request #32 from AndresSilva12/fix/variant-sync-product-context
    
    fix: render immediate variant after creation and update product context instead of fetch

[33mcommit bc6acf8f272ef259d70d138303e57a2310534d42[m[33m ([m[1;31morigin/fix/variant-sync-product-context[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jul 16 17:13:37 2025 -0300

    fix: render immediate variant after creation and update product context instead of fetch

[33mcommit 97a7a2e43df58893720fab8b2e34833360fbb55b[m
Merge: 2901b83 2b6f6af
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Mon Jul 14 09:38:04 2025 -0300

    Merge pull request #30 from AndresSilva12/enhancement/refactor-and-split-logic-variants
    
    enhancement: Refactor components and add modal close on backdrop click

[33mcommit 2b6f6af3d0f9c05f5bc08fb79649cbafd18cebdd[m[33m ([m[1;31morigin/enhancement/refactor-and-split-logic-variants[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 14 09:31:44 2025 -0300

    enhancement: Refactor components and add modal close on backdrop click

[33mcommit 2901b83f1307b901e5b25ffe88887f70163cdd2e[m
Merge: 7a3d2d4 e678bb8
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jul 10 11:05:42 2025 -0300

    Merge pull request #29 from AndresSilva12/fix/variant-check-and-delete-local-logic
    
    fix: validate variant existence on server before check or delete

[33mcommit e678bb825b979374a25c9edde7add241a798db8f[m[33m ([m[1;31morigin/fix/variant-check-and-delete-local-logic[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jul 10 10:59:26 2025 -0300

    fix: validate variant existence on server before check function  or delete

[33mcommit 7a3d2d46b4ad3af4fe7b4965da1d238263399bef[m
Merge: 75cff65 d4fc005
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Mon Jul 7 14:32:51 2025 -0300

    Merge pull request #27 from AndresSilva12/enhancement/delete-uploaded-image-on-variant-delete
    
    enhancement: delete associated image when variant is deleted

[33mcommit d4fc0053cbf96da585448f04b54986d5191dd626[m[33m ([m[1;31morigin/enhancement/delete-uploaded-image-on-variant-delete[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jul 7 14:27:37 2025 -0300

    enhancement: delete associated image when variant is deleted

[33mcommit 75cff65889e842063c4a8540b551deca3e19c0d4[m
Merge: bc85940 a576799
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Fri Jul 4 12:21:52 2025 -0300

    Merge pull request #25 from AndresSilva12/enhancement/mixed-variant-logic
    
    enhancement: implement mixed variant logic for improved UX on existing products

[33mcommit a576799ee0858010a2c775731fea2868b7417730[m[33m ([m[1;31morigin/enhancement/mixed-variant-logic[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jul 4 12:16:00 2025 -0300

    enhancement: implement mixed variant logic for improved UX on existing products

[33mcommit bc859402e63fce3da3cf3017b0ba392e845e9836[m
Merge: 505ca69 472a918
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jul 3 11:58:59 2025 -0300

    Merge pull request #21 from AndresSilva12/fix/reduce-unnecessary-requests
    
    fix: reduce unnecessary requests and sync UI after variant deletion

[33mcommit 472a91867572a06cc915a6f8813dc37b0cbebf73[m[33m ([m[1;31morigin/fix/reduce-unnecessary-requests[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jul 3 11:47:49 2025 -0300

    fix: reduce unnecessary requests and sync UI after variant deletion

[33mcommit 505ca695019638b50ab4359c1eba4f9390a23a25[m
Merge: 48e7296 eddb219
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Wed Jul 2 11:55:13 2025 -0300

    Merge pull request #20 from AndresSilva12/enhancement/validate-unique-field-before-create-variant
    
    enhancement: add unique code validation for variants in frontend

[33mcommit eddb219ddbc841c6cdc841588acdc918f8d26136[m[33m ([m[1;31morigin/enhancement/validate-unique-field-before-create-variant[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jul 2 11:38:40 2025 -0300

    enhancement: add unique code validation for variants in frontend

[33mcommit 48e72966f016358391566c470bdaf88de0f97e0a[m
Merge: 77e44ab 07ec20b
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Tue Jul 1 11:28:58 2025 -0300

    Merge pull request #18 from AndresSilva12/fix/duplicate-local-variant-codes
    
    fix: duplicate local variant codes

[33mcommit 07ec20b643693cddc27242d9e09ee81dd090593f[m[33m ([m[1;31morigin/fix/duplicate-local-variant-codes[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jul 1 11:06:25 2025 -0300

    fix: properly delete local variants using localId

[33mcommit 41bef17887c19edd83dd7d98265e1dfa8396db4d[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jul 1 11:03:48 2025 -0300

    fix: prevent variants with duplicate code in frontend

[33mcommit 77e44abfb04c0bb4de17a4d8d3b8658353cebd8f[m
Merge: 197ad58 f1c7138
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Mon Jun 30 19:29:10 2025 -0300

    Merge pull request #15 from AndresSilva12/fix/validate-unique-fields-in-products-and-variants
    
    fix: validate unique fields and add localId to temp variants

[33mcommit f1c71380fd7bc2cc2398801f962ce05320b6494c[m[33m ([m[1;31morigin/fix/validate-unique-fields-in-products-and-variants[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 30 19:15:00 2025 -0300

    fix: validate unique fields and add localId to temp variants

[33mcommit 197ad5864f0a42e844ddf88e2b76363ac367e1c3[m
Merge: 88adc04 527deba
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Sat Jun 28 20:16:30 2025 -0300

    Merge pull request #14 from AndresSilva12/enhancement/format-price
    
    enhancement: prices formatted on product cards

[33mcommit 527deba80a996f97cb92d0deb3db8e2d1ebecfee[m[33m ([m[1;31morigin/enhancement/format-price[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Sat Jun 28 20:08:07 2025 -0300

    enhancement: prices formatted on product cards

[33mcommit 88adc049ef9347d8c2e90f9a7c852627a0ff09ff[m
Merge: 5cb29cc 6cef9a1
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jun 26 20:10:10 2025 -0300

    Merge pull request #13 from AndresSilva12/fix/loss-warning-on-product-creation
    
    fix: add warning alert about loss on product creation

[33mcommit 6cef9a15753d1d71b4b486c9402dbb8e7a9ba69e[m[33m ([m[1;31morigin/fix/loss-warning-on-product-creation[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 26 20:02:08 2025 -0300

    fix: add warning alert about loss on product creation

[33mcommit 5cb29ccc328357d677e95fc94b53e2f1a8b9bf41[m
Merge: 2eaf3af 8ebc38f
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jun 26 19:15:40 2025 -0300

    Merge pull request #12 from AndresSilva12/enhancement/double-confirmation-before-delete
    
    enhancement: add double confirmation at delete products or variants

[33mcommit 8ebc38f081710fe915c3b446c599d57f60778b9b[m[33m ([m[1;31morigin/enhancement/double-confirmation-before-delete[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 26 19:07:22 2025 -0300

    enhancement: add double confirmation at delete products or variants

[33mcommit 2eaf3af0cb2a487cf783718b96da44b164f73c66[m
Merge: 771a052 f90cff1
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jun 26 15:18:59 2025 -0300

    Merge pull request #11 from AndresSilva12/fix/delete-sessionToken-with-delete-account
    
    fix: clear session cookies at delete user

[33mcommit f90cff1a54a3d57035b5a2d8071ac7697199cc9a[m[33m ([m[1;31morigin/fix/delete-sessionToken-with-delete-account[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 26 15:10:17 2025 -0300

    fix: clear session cookies at delete user

[33mcommit 771a052fb9ea52ccd1c4004f025f74eca9bb68fc[m
Merge: d5cccd3 9602eb0
Author: Andres Silva <143754977+AndresSilva12@users.noreply.github.com>
Date:   Thu Jun 26 11:05:35 2025 -0300

    Merge pull request #10 from AndresSilva12/fix/validate-file-image-type
    
    fix: validate uploaded image files and allowed extensions

[33mcommit 9602eb0e7cbbcd2f0dfa6c734336a292d665184d[m[33m ([m[1;31morigin/fix/validate-file-image-type[m[33m)[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 26 10:43:34 2025 -0300

    fix: validate uploaded image files and allowed extensions

[33mcommit d5cccd37401595f954c02f22aa1cc713b5265440[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jun 25 11:24:28 2025 -0300

    refactor: remove console.log statements and ignore uploads folder

[33mcommit 2b27171af678233f5de24ddd68d569534e2d20bb[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 24 21:40:36 2025 -0300

    Fix: correct route method for image upload in index.js

[33mcommit 1025a29aff783db37e51dd5edbe5892fdb193a5e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 24 21:24:10 2025 -0300

    Refactor: Modularize route and controller for image upload

[33mcommit bbe6ec36b957befd98cff8366f04b9e8d44acbc2[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 24 19:34:24 2025 -0300

    feat: full image upload functionality & frontend rendering

[33mcommit 1bba77bcb3b2b36b92411f9614656e04e300eeb4[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 23 15:13:10 2025 -0300

    Style: add styles in ProductsPage

[33mcommit 7735e52acf23e59d074bf983d1922cb977870f40[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 23 15:01:24 2025 -0300

    Feat: allow creating, editing, and deleting variants from inside ProductModal using useVariants hook

[33mcommit 6b18b9bf5d6cc9aef17fa44a29d418befda8753f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 23 12:24:12 2025 -0300

    Cleanup: improve Tailwind layout, remove VariantPage, and rename components

[33mcommit 2fc2fcc6158abda0de2f423c524510623c485bcf[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 23 12:03:50 2025 -0300

    Refactor: remove modalCreate state and use productUpdate as control

[33mcommit a5adf05b7eaeb396e917234b5f7aee911fd54bf6[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 23 11:47:23 2025 -0300

    Replace useProducts hook with centralized ProductsContext

[33mcommit b5bc4199a2fd65eefe6cc590d8ca2d8fc64898fc[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jun 20 19:17:55 2025 -0300

    make VariantModal reusable for creation and editing

[33mcommit eab1197929429be3889066aad69befd2b848de95[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jun 20 17:06:44 2025 -0300

    add basic variant management with custom hook

[33mcommit 04698053841c1cca73a0e495d9c2b09509c00f23[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jun 20 15:09:57 2025 -0300

    remove unused product components and reorganize files for product page integration

[33mcommit 97637e6d864a1df215cb80736e9eb5248d6c5c87[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 19 20:35:49 2025 -0300

    make ProductModal reusable for creation and editing

[33mcommit 030381e6e40d025a3931fd1a4d9783701cc1343e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jun 18 20:53:10 2025 -0300

    refactor custom hook 'useProducts' to reduce fetch requests

[33mcommit 787990e03528e952232563eb6d94e7de43826bea[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 17 17:31:33 2025 -0300

    extract ProductForm into reusable component

[33mcommit 8c4768f563fe4eacc092d3281e39b73dd9c018c8[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 17 13:35:11 2025 -0300

    Improve product update flow and toast display

[33mcommit bebefae853451b747ba13df12fd8c76c5537f920[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 17 12:39:22 2025 -0300

    split product form page into hook and modal components

[33mcommit c3ddf0242fcfb9c759f1a3d55d43d31206f7f72e[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jun 13 20:04:40 2025 -0300

    add product form page with live product list, reusable toast utility, and validation fixes

[33mcommit 3d3c370c474086eda18a1d8025fcf396257f006b[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 10 19:23:46 2025 -0300

    validate unique code on variant update middleware

[33mcommit c36e287186a2a182bf2d5e56fcb14953c24cbfb6[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 10 10:45:32 2025 -0300

    add Zod partial schema and middlewares for ID validation and variant existence check

[33mcommit 936823fde689fc0b8ca59160efd0a284f8673076[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 10 10:15:04 2025 -0300

    Add zod schema & validation middleware for creating product variants

[33mcommit 27c4f55572bc93839a1857f547dc7027933ebccd[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Tue Jun 10 08:55:47 2025 -0300

    add endpoints to get & delete variants by product + cascade delete on product removal

[33mcommit 52fc1a6e99484f26325848b59432fa959cd1e4d7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 9 19:32:47 2025 -0300

    implement POST /variants with controller and route

[33mcommit f3f4dc0a4a406b9312a8401414c519f17e3e80ec[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 9 18:49:14 2025 -0300

    normalize models in schema.prisma, fix related schemas & middlewares

[33mcommit 7926737905d32f45afcccff19137f50205b58bf1[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 9 14:52:46 2025 -0300

    add 'validateProductExist' middleware to product routes

[33mcommit e8c0f0fe05d38a94889831b1d50f930e5adbdb29[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 9 12:16:54 2025 -0300

    add reusable middleware to validate product existence

[33mcommit f063788b9bc5bd77272c05d4616a46a1df95d937[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Mon Jun 9 11:26:59 2025 -0300

    Add Middleware validateUpdateProducts, update & cuid schemas

[33mcommit ffe2e74c6d090c13c676a944f6170fa7dcb6a9b0[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Fri Jun 6 12:25:17 2025 -0300

    Add product validation schema with Zod and POST middleware

[33mcommit 74c946f044d1780e6763ca4dd78e0bc0d1d6428f[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 5 17:20:32 2025 -0300

    separate product endpoints into controller

[33mcommit 0f56c9433600f67e1729b00ad2d353f4d0f55621[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Thu Jun 5 16:59:38 2025 -0300

    add endpoints and request handlers for product CRUD

[33mcommit 4c783bd61c4412eb8f32b91ffaffcd5db6d328c7[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jun 4 20:01:53 2025 -0300

    create product routes & migrate schema.prisma for the database

[33mcommit e5f099d229cd0413fde1659269232cd1bd2e2827[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jun 4 19:40:45 2025 -0300

    add products & productVariant  models in 'schema.prisma'

[33mcommit 2cdbbc36702dc3e84bf5c31785c5ea23687529b5[m
Author: Andres Silva <andres.silva41202@gmail.com>
Date:   Wed Jun 4 15:22:54 2025 -0300

    First commit of existing project
