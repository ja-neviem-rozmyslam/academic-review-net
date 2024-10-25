# Registracia
- User sa zaregistruje -> vyberá si univerzitu (ak je mail v domain tabulke, tak sa univerzita pre-selectne).
- Request na BE (overí sa, či už user neexistuje v tabulke).
- Dojde mu verifikačný email -> po potvrdení emailu sa vytvorí account v DB.
- user ID = UUID (vygeneruje sa) **VERIFIKACIA** ak existuje dane UUID tak sa vygeneruje nove

# Login
- Logne sa in (mail + heslo).
- Request na BE (vygeneruje sa token, na FE sa pošle token + objekt DTO usera).
- Time to live tokenu je 30 minút (ak je browser otvorený, token sa obnoví).

# Konferencia/Práca
## Študent
- Vyberá si konferenciu zo zoznamu konferencií (zadá heslo) -> uploadne prácu (upload je povolený do deadlinu, môže meniť obsah koľkokrát chce, všetky polia).
- Počas/po review deadline si môže prehliadnuť review ku svojej práci.
- **Anonymné reviewovanie** prác ostatných študentov ??? (ToDo).

## Reviewer
- Pri prehľade svojich prác vidí malú ikonku, či už urobil review alebo nie (`review JSON column != NULL`).
- Vidí prehľad svojich prác na vykonanie recenzie (nepotrebuje prístup ku konferenciám).
- Vie si sitahnuť prácu ktorá je uploadnutá.
- `uploadDeadline` < (v tomto období vie písať review na prácu) < `reviewDeadline`.

## Admin
- Vytvorí konferenciu (zada heslo, vyberie otázky na konferenciu, deadliny setne, vyplní všetko ostatné).
- Assignuje reviewerov (po deadlajne uploadu).
- Vie exportovať všetky práce z danej konferencie (práce v directory, spolu s review, a nejak definovať, kto je autor a reviewerom práce v nejakom dokumente).
- Zatvorí konferenciu po ukončení.

# Ukladanie dokumentov
- Každá konferencia má vlastný folder kde sú všetky práce študentov ktorý sú súčasťou tej konferencie
- pri prvom uploade sa študentovi vytvorí vlastný folder (**folder_hash** ktorý bude na základe meno prace (normalizovane ziadna diakritika + timestamp) - folder hash sa vytvorí len pri prvom uploade (potom sa už neprepiuje))
- po uploadnutí práce sa študentovi uloží práca do tohto folderu, pri opakovanom uploade (ak existuje práca s rovnakým menom, sa premenuje staarý file)

# Stahovanie dokumentov
- Otvorí si konferenciu odkial si chce stiahnut práce
- button na stiahnutie prác -> vyhladajú všetky tézy danej konferencie (uploaded_theses)
- Vytvorí sa folder konferencie -> vygeneruje sa CSV file -> pôjde query cez uploaded_theses zoberie názvy prác a vytvorí sub-foldery s názvami prác
- keď sa vytvára daní subfolder -> vyberie sa na základe hashu file (alebo viac filov) z file systemu a vloží sa do toho sub-folderu
- vyberu sa z danej tezy vsetky ostatne data (autory, reviewwer, kategoria ....) a vlozia sa do csv filu ako row
- a toto sa urobí pre každú jednu prácu v danej konferencii
- na konci sa **folder konferencie** zazipuje (buď sa bude modifikovať v pamäti alebo sa vytvorí niekde fyzicky a na konci sa vymaže)
