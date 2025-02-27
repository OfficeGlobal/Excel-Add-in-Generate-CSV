﻿---
page_type: sample
products:
- office-excel
- office-365
languages:
- javascript
extensions:
  contentType: samples
  technologies:
  - Add-ins
  createdDate: 10/15/2015 1:50:50 PM
---
# <a name="csv-generator-task-pane-add-in-sample-for-excel-2016"></a>Exemple de complément de volet Office - Générateur de fichier CSV pour Excel 2016

_S’applique à : Excel 2016_

Ce complément de volet Office montre comment créer une table à partir d’une liste de noms de colonnes à l’aide des API JavaScript dans Excel 2016. Il a deux versions : éditeur de code et Visual Studio.

![Exemple de générateur de fichier CSV](../Images/ScreenCap1.PNG)

## <a name="try-it-out"></a>Essayez !
### <a name="code-editor-version"></a>Version d’éditeur de code

Pour déployer et tester votre complément, le plus simple consiste à copier les fichiers sur un partage réseau.

1.  Hébergez les fichiers dans le dossier du projet d’éditeur de code à l’aide d’un serveur de votre choix.
2.  Modifiez les éléments \<SourceLocation\> et \<Url\> du fichier manifeste afin qu’il pointe vers l’emplacement hébergé créé à l’étape 1 (par exemple, https://localhost/CSVGenerator/Home.html).
3.  Copiez le fichier manifeste (TeacherCSVGenerator.xml) dans un partage réseau (par exemple, \\\MyShare\MyManifests).
4.  Ajoutez l’emplacement de partage qui contient le fichier manifeste sous forme de catalogue d’applications approuvées dans Excel.

    a.  Lancez Excel et ouvrez une feuille de calcul vide.

    b.  Choisissez l’onglet **Fichier**, puis choisissez **Options**.

    c.  Choisissez l’onglet **Centre de gestion de la confidentialité**, puis choisissez **Paramètres du Centre de gestion de la confidentialité**.

    d.  Choisissez **Catalogues de compléments approuvés**.

    e.  Dans la zone **URL du catalogue**, entrez le chemin d’accès du partage réseau que vous avez créé à l’étape 3, puis choisissez **Ajouter un catalogue**.

   Activez la case à cocher **Afficher dans le menu**, puis cliquez sur **OK**. Un message s’affiche pour vous informer que vos paramètres seront appliqués la prochaine fois que vous démarrerez Office.

5.  Testez et exécutez le complément.

    a.  Dans l’onglet**Insertion** d’Excel 2016, choisissez **Mes compléments**.

    b.  Dans la boîte de dialogue **Compléments Office**, choisissez **Dossier partagé**.

    c.  Choisissez **Exemple de liste d’élèves CSV de l’enseignant**>**Insertion**. Le complément s’ouvre dans un volet Office et crée la liste des élèves au format CSV dans la feuille active, comme indiqué dans la capture d’écran.

   ![Exemple de suivi de budget universitaire](../Images/ScreenCap2.PNG)

    d.  Sélectionnez un service de gestion de classe.

    e.  Cliquez sur le bouton Créer une liste pour insérer une liste vide dans la feuille de calcul active.

      ![Exemple de suivi de budget universitaire](../Images/ScreenCap3.PNG)

    f.  Cliquez sur le bouton Aide à l’exportation Excel pour découvrir comment exporter la feuille de calcul sous la forme d’un fichier .csv.


### <a name="visual-studio-version"></a>Version de Visual Studio
1.  Copiez le projet dans un dossier local et ouvrez le fichier TeacherCSVGenerator.sln dans Visual Studio.
2.  Appuyez sur F5 pour créer et déployer l’exemple de complément. Excel démarre et le complément s’ouvre dans un volet Office à droite de la feuille de calcul vide, comme indiqué dans la capture d’écran suivante.

  ![Exemple de générateur de fichier CSV Excel](../Images/ScreenCap1.PNG)

3.  Sélectionnez un service de gestion de classe en ligne dans la liste déroulante.
4.  Ajoutez un tableau de listes d’étudiants à l’aide du bouton **Créer une liste**, puis examinez le tableau créé dans la feuille de calcul active.

  ![Exemple de suivi de budget universitaire](../Images/ScreenCap3.PNG)
5.  Ajoutez des élèves à la liste en renseignant les cellules des lignes sous l’en-tête de tableau.
6.  Utilisez la fonctionnalité d’exportation dans Excel pour enregistrer la feuille de calcul sous un fichier CSV. Ce fichier est au format approprié pour être importé dans le service de votre choix.


### <a name="learn-more"></a>En savoir plus

Les API JavaScript pour Excel peuvent vous offrir beaucoup pour l’élaboration de vos compléments. Voici quelques-unes des ressources disponibles :

1.  [Présentation de la programmation JavaScript pour les compléments Excel](https://github.com/OfficeDev/office-js-docs/blob/master/excel/excel-add-ins-programming-overview.md)
2.  [Explorateur d’extraits de code pour Excel](http://officesnippetexplorer.azurewebsites.net/#/snippets/excel)
3.  [Exemples de code pour les compléments Excel](https://github.com/OfficeDev/office-js-docs/blob/master/excel/excel-add-ins-code-samples.md)
4.  [Référence de l’API JavaScript pour les compléments Excel](https://github.com/OfficeDev/office-js-docs/blob/master/excel/excel-add-ins-javascript-reference.md)
5.  [Création de votre premier complément Excel](https://github.com/OfficeDev/office-js-docs/blob/master/excel/build-your-first-excel-add-in.md)


Ce projet a adopté le [code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour plus d’informations, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.
