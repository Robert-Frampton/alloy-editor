(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonParagraphAlignLeft', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should align the selection to the left on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: right">{There should be a paragraph aligned to the left.}</p>');

            var buttonParagraphAlignLeft = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignLeft editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphAlignLeft));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a paragraph aligned to the left.</p>');
        });

        it('should preserve tags ad attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color: red;">{There should be a paragraph aligned to the left.}</h1>');

            var buttonParagraphAlignLeft = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignLeft editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphAlignLeft));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<h1 style="color: red;">There should be a paragraph aligned to the left.</h1>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>{A paragraph aligned to the left.}</p>');

            var buttonParagraphAlignLeft = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignLeft editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphAlignLeft);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
